import Header from "@/components/shared/header";
import { Outlet } from "react-router-dom";

export default function ProtectedLayout() {
  return (
      <main className="flex flex-col overflow-hidden flex-1 max-h-[100vh]">
        <header className="sticky top-0 flex h-16 items-center gap-4 border-b px-4 md:px-6 bg-primary">
         <Header/>
        </header>

        {/* <div className="z-10 border rounded-lg w-full flex-grow overflow-hidden text-sm flex"> */}
        <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 overflow-x-hidden overflow-y-auto">
          <Outlet/>
        </div>
        {/* <div className="flex justify-between max-w-5xl w-full items-start text-xs md:text-sm text-muted-foreground ">
         Footer
      </div> */}
      </main>
  );
}
