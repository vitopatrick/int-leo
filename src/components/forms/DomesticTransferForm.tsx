import { yupResolver } from "@hookform/resolvers/yup";
import {
  addDoc,
  collection,
  doc,
  increment,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";
import { db } from "../../firebase";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
// import { useNavigate } from "react-router-dom";
import { TransferOtp } from "../otp/OtpForm";

type Props = {};

// account type options
// const accountTypeOptions = [
//   "Checking Account",
//   "Savings Account",
//   "Fixed Deposit",
//   "Premium Leo Account",
// ];

const formSchema = new yup.ObjectSchema({
  amount: yup.string().required().min(1),
  beneficiary_name: yup
    .string()
    .required("Beneficiary Account Name is important"),
  bankName: yup.string().required("Bank Name is required"),
  beneficiary_account_number: yup
    .string()
    .required("Account number is important"),
  account_type: yup.string().required().min(1),
  remark: yup.string().required().min(1),
  ims_code: yup.string().required("IMS code is Required"),
});

const DomesticTransferForm = (props: Props) => {
  // use form hook
  const {
    register,

    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(formSchema),
  });

  const { user }: any = useContext(AuthContext);

  // form values
  const formValues = {
    amount: watch("amount"),
    beneficiary_name: watch("beneficiary_name"),
    bankName: watch("bankName"),
    beneficiary_account_number: watch("beneficiary_account_number"),
    account_type: watch("account_type"),
    remark: watch("remark"),
    ims_code: watch("ims_code"),
  };

  // Add to firebase
  const AddToFireStore = async (formValue: any) => {
    try {
      const transactionRef = collection(
        db,
        "user",
        `${user.email}`,
        "transactions"
      );

      // user ref
      const userRef = doc(db, "user", user.email);

      await addDoc(transactionRef, {
        ...formValue,
        approved: false,
        date: serverTimestamp(),
        type: "Domestic Transfer",
      });

      await updateDoc(userRef, {
        accountBalance: increment(-formValue.amount),
      });

      toast.success("Transaction successful", {
        bodyClassName: "toast",
        position: "top-center",
      });
    } catch (error) {
      toast.error("Failed Transaction", {
        bodyClassName: "toast",
        position: "top-center",
      });
    }
  };

  return (
    <>
      <form className="md:w-[60%] mx-auto">
        {/* amount */}
        <div className="flex flex-col gap-2 my-4">
          <label htmlFor="Amount" className="font-light font-sans">
            Amount
          </label>
          <input
            type="text"
            {...register("amount")}
            className="p-3 rounded bg-slate-400/20  font-sans font-light"
          />
          <p className="text-red-500 text-sm font-sans capitalize font-light">
            {errors.amount?.message}
          </p>
        </div>
        {/* beneficiary Name */}
        <div className="flex flex-col gap-2 my-4">
          <label htmlFor="Account Name" className="font-light font-sans">
            Beneficiary Account Name
          </label>
          <input
            {...register("beneficiary_name")}
            className="p-3 rounded bg-slate-400/20  font-sans font-light"
          />
          <p className="text-red-500 text-sm font-sans capitalize font-light">
            {errors.beneficiary_name?.message}
          </p>
        </div>
        {/* bank Name */}
        <div className="flex flex-col gap-2 my-4">
          <label htmlFor="full name" className="font-light font-sans">
            Bank Name
          </label>
          <input
            type="text"
            {...register("bankName")}
            className="p-3 rounded bg-slate-400/20  font-sans font-light"
          />
          <p className="text-red-500 text-sm font-sans capitalize font-light">
            {errors.bankName?.message}
          </p>
        </div>
        {/* Beneficiary Account number */}
        <div className="flex flex-col gap-2 my-4">
          <label htmlFor="full name" className="font-light font-sans">
            Beneficiary Account Number
          </label>
          <input
            type="text"
            {...register("beneficiary_account_number")}
            className="p-3 rounded bg-slate-400/20  font-sans font-light"
          />
          <p className="text-red-500 text-sm font-sans capitalize font-light">
            {errors.beneficiary_account_number?.message}
          </p>
        </div>
        {/* Ims */}
        <div className="flex flex-col gap-2 my-4">
          <label htmlFor="Remarks" className="font-light font-sans">
            IMS Code
          </label>
          <input
            type="text"
            {...register("ims_code")}
            className="resize-y bg-slate-400/20 px-2 font-sans font-light capitalize py-2"
          />
          <p className="text-red-500 text-sm font-sans capitalize font-light">
            {errors.ims_code?.message}
          </p>
        </div>
        {/* fund Purpose */}
        <div className="flex flex-col gap-2 my-4">
          <label
            htmlFor="account description"
            className="font-light font-sans "
          >
            Remark
          </label>
          <textarea
            {...register("remark")}
            className="p-4 outline-none resize-none  rounded bg-slate-400/20  font-sans font-light"
          />
          <p className="text-red-500 text-sm font-sans capitalize font-light">
            {errors.remark?.message}
          </p>
        </div>

        {/* account type */}
        <div className="flex flex-col gap-2 my-4">
          <label htmlFor="account type" className="font-light font-sans">
            Account type
          </label>
          <select
            {...register("account_type")}
            className="font-sans p-3 bg-slate-400/20 font-light"
          >
            <option value="checking">checking account</option>
            <option value="fixed">fixed deposit account</option>
            <option value="savings">savings account</option>
            <option value="Premium leo">Premium leo account</option>
          </select>
        </div>
      </form>
      <TransferOtp formValues={formValues} fn={AddToFireStore} />
    </>
  );
};

export default DomesticTransferForm;
