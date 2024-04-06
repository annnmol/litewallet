// ====== URL QUERY PARAMS
interface UrlQueryParams {
  params: string
  key: string
  value: string | null
}

interface RemoveUrlQueryParams {
  params: string
  keysToRemove: string[]
}

interface SearchParamProps {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

interface IData {
  [key: string]: any;
}

interface IWallet { 
  _id: string
  name: string
  balance: number
  date: string
}


interface ITransaction { 
  _id: string
  walletId: string
  amount: number
  balance: number
  description: string
  type: "CREDIT" | "DEBIT"
  date: date
}
