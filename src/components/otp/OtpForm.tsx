import { Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useFetchUser } from "@/hooks/useFetchUser";
import { useNavigate } from "react-router-dom";

export function TransferOtp({ formValues, fn }: any) {
  const [otp, setOpt] = useState<any>();
  const navigate = useNavigate();

  const { userState: user } = useFetchUser();

  const submit = async () => {
    if (parseInt(otp) !== user?.otp) {
      return navigate("/dashboard/failed");
    }

    await fn(formValues);

    return navigate("/dashboard/success", { state: formValues });
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
