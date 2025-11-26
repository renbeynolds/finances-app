import { Route, Routes } from "react-router";
import BankAccountView from "./Accounts/BankAccountView";
import InvestmentAccountView from "./Accounts/InvestmentAccountView";
import Budgeting from "./Budgeting";
import CategoryView from "./Categories/CategoryView";
import Explore from "./Explore";
import Snapshot from "./Snapshot";
import Trends from "./Trends";
import UploadView from "./Uploads/UploadView";

export default function MainContent() {
  return (
    <Routes>
      <Route path="/snapshot" element={<Snapshot />} />
      <Route path="/trends" element={<Trends />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/accounts" element={<div />} />
      <Route path="/accounts/bank/:accountId" element={<BankAccountView />} />
      <Route
        path="/accounts/investment/:accountId"
        element={<InvestmentAccountView />}
      />
      <Route path="/uploads/:uploadId" element={<UploadView />} />
      <Route path="/categories/:categoryId" element={<CategoryView />} />
      <Route path="/budgeting" element={<Budgeting />} />
    </Routes>
  );
}
