//user defined components
import useAppStore from "@/store";
import { NetworkService } from "@/services/network";
import { handleError } from "@/lib/utils";

interface IFetchTransactionsProps {
  id: string;
  skip?: number;
  limit?: number;
  amount?: number;
  date?: number;
}

const useTransactionService = () => {
  const { setLoading, loading, transactions, setTransactions } = useAppStore();

  const createTranscation = async (
    walletId: string,
    amount:number,
    description: string
  ): Promise<any> => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      NetworkService.post(`/transact/${walletId}`,{amount,description})
        .then((res: any) => {
          if (res?.error) {
            handleError(res);
            reject(res);
          } else {
            // setAuthSession(res?.data?._id);
            // setCurrentWallet(res?.data);
            resolve(res);
          }
        })
        .catch((error) => {
          handleError(error);
          reject(error);
        })
        .finally(() => {
          setLoading(false);
        });
    });
  };

  const getTranscations = async ({
    id,
    amount,
    limit,
    skip,
    date,
  }: IFetchTransactionsProps): Promise<any> => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      let url = `/transactions?walletId=${id}`;
      if (typeof skip === "number") {
        url += `&skip=${skip}`;
      }
      if (typeof limit === "number") {
        url += `&limit=${limit}`;
      }
      if (amount) {
        url += `&amount=${amount}`;
      }
      if (date) {
        url += `&date=${date}`;
      }

      console.log(
        `🚀 ~ file: useTransactionService.ts:61 ~ returnnewPromise ~ url:`,
        url
      );

      NetworkService.get(url)
        .then((res: any) => {
          if (res?.error) {
            handleError(res);
            reject(res);
          } else {
            setTransactions(res?.data);
            resolve(res);
          }
        })
        .catch((error) => {
          handleError(error);
          reject(error);
        })
        .finally(() => {
          setLoading(false);
        });
    });
  };

  const exportTranscations = async (id: string): Promise<any> => {
    return new Promise((resolve, reject) => {
      // setLoading(true);
      // NetworkService.get(`/wallet/${id}`)
      //   .then((res: any) => {
      //     if (res?.error) {
      //       handleError(res);
      //       reject(res);
      //     } else {
      //       setCurrentWallet(res?.data);
      //       resolve(res);
      //     }
      //   })
      //   .catch((error) => {
      //     handleError(error);
      //     reject(error);
      //   })
      //   .finally(() => {
      //     setLoading(false);
      //   });
    });
  };

  return { getTranscations, loading, exportTranscations, createTranscation };
};
export default useTransactionService;
