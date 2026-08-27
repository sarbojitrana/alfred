import { env } from "@/config/env";
import { apiContract } from "@alfred/openapi/contracts";
import { useAuth } from "@clerk/clerk-react";
import { initClient } from "@ts-rest/core";
import axios, {
  type Method,
  type AxiosError,
  isAxiosError,
  type AxiosResponse,
} from "axios";

type Headers = Awaited<
  ReturnType<NonNullable<Parameters<typeof initClient>[1]["api"]>>
>["headers"];

export type TApiClient = ReturnType<typeof useApiClient>;

export const useApiClient = ({ isBlob = false }: { isBlob?: boolean } = {}) => {
  const { getToken } = useAuth();

  return initClient(apiContract, {
    baseUrl: "",
    baseHeaders: {
      "Content-Type": "application/json",
    },
    api: async ({ path, method, headers, body }) => {
      const token = await getToken();

      // FormData must carry the multipart boundary axios generates for it,
      // so never send a hand-written Content-Type alongside it.
      const isFormData = typeof FormData !== "undefined" && body instanceof FormData;
      const requestHeaders: Record<string, string | undefined> = {
        ...headers,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      };
      if (isFormData) {
        delete requestHeaders["Content-Type"];
        delete requestHeaders["content-type"];
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const makeRequest = async (retryCount = 0): Promise<any> => {
        try {
          const result = await axios.request({
            method: method as Method,
            url: `${env.VITE_API_URL}${path}`,
            headers: requestHeaders,
            data: body,
            ...(isBlob ? { responseType: "blob" } : {}),
          });
          return {
            status: result.status,
            body: result.data,
            headers: result.headers as unknown as Headers,
          };
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (e: Error | AxiosError | any) {
          if (isAxiosError(e)) {
            const error = e as AxiosError;
            const response = error.response as AxiosResponse;

            // If unauthorized and we haven't retried yet, retry
            if (response?.status === 401 && retryCount < 2) {
              return makeRequest(retryCount + 1);
            }

            return {
              status: response?.status || 500,
              body: response?.data || { message: "Internal server error" },
              headers: (response?.headers as unknown as Headers) || {},
            };
          }
          throw e;
        }
      };

      return makeRequest();
    },
  });
};
