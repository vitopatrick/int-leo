import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useFetchUser } from "@/hooks/useFetchUser";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { doc, increment, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";

export function TransferOtp({ formValues, fn }: any) {
  const [otp, setOpt] = useState<any>();
  const navigate = useNavigate();

  const { userState: user } = useFetchUser();

  const submit = async () => {
    try {
      if (parseInt(otp) === user?.otp) {
        toast.success("Transaction Successful", {
          bodyClassName: "toast",
        });

        await fn(formValues);

        const userRef = doc(db, "user", user.email);

        await updateDoc(userRef, {
          accountBalance: increment(-formValues.amount),
        });

        return navigate("/dashboard/success", { state: formValues });
      } else {
        throw Error();
      }
    } catch (error) {
      toast.error("Transaction Failed", {
        bodyClassName: "toast",
      });
      return navigate("/dashboard/failed");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className="w-full bg-blue-700 hover:bg-blue-600"
        >
          Proceed
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Please Enter OTP</DialogTitle>
          <DialogDescription>
            Enter Correct OTP to proceed transaction.
          </DialogDescription>
        </DialogHeader>
        <div>
          <div className="space-y-4">
            <Label htmlFor="link" className="sr-only">
              OTP
            </Label>
            <Input
              id="link"
              value={otp}
              onChange={(e: any) => setOpt(e.target.value)}
            />
            <Button
              className="bg-blue-700 hover:bg-blue-600 w-full"
              variant={"default"}
              onClick={submit}
            >
              Proceed
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
