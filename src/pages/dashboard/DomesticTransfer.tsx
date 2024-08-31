import DomesticTransferForm from "../../components/forms/DomesticTransferForm";

type Props = {};

const DomesticTransfer = (props: Props) => {
  return (
    <div>
      {/* header */}
      <div className="my-4">
        <h4 className="font-sans uppercase font-normal py-3 underline tracking-widest text-slate-900">
          Domestic Transfer
        </h4>
      </div>
      {/* form */}
      <DomesticTransferForm />
    </div>
  );
};

export default DomesticTransfer;
