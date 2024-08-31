import InternationalTransferForm from "../../components/forms/InternationalTransferForm";

type Props = {};

const InternationalTransfer = (props: Props) => {
  return (
    <div>
      {/* header */}
      <div className="my-4">
        <h4 className="font-sans uppercase font-normal py-3 underline tracking-widest text-slate-900">
          International Transfer
        </h4>
      </div>
      {/* form */}
      <InternationalTransferForm />
    </div>
  );
};

export default InternationalTransfer;
