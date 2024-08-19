import { UnderMaintenance } from "core-library/assets";
import Image from "next/image";
import { NotifySchema, NotifyType } from "../../../core/Schema";
import { FormProvider, useForm } from "react-hook-form";
import { TextField, Button } from "core-library/components";
import { yupResolver } from "@hookform/resolvers/yup";

interface Props {
  onSubmit: (values: NotifyType) => void;
}

export const MaintenanceForm: React.FC<Props> = ({ onSubmit }) => {
  const form = useForm<NotifyType>({
    mode: "onSubmit",
    resolver: yupResolver(NotifySchema),
    defaultValues: NotifySchema.getDefault(),
  });
  const { control, handleSubmit } = form;

  return (
    <div className="h-screen flex justify-center items-center ">
      <div className="flex flex-col">
        <div className="w-[800px]">
          <h1 className="text-[#0f2a71] text-[55px] font-bold font-Rajdhani ml-12 pb-3">
            Application Under Development
          </h1>

          <p className="w-[600px] text-[20px] text-[#9A9A9A] font-ptSans pb-7 ml-12 bottom-3">
            Our application is currently under development and is not yet
            online. We’re working to bring it to life. Please click the "Notify
            Me" button and provide your email address to stay informed.
          </p>
        </div>

        <div className="flex mt-3">
          <div className="w-[500px] ml-12">
            <FormProvider {...form}>
              <TextField
                control={control}
                label="Email"
                name="email"
                sx={{
                  borderRadius: "10px",
                  width: "100%",
                }}
                inputProps={{ style: { padding: 12, borderRadius: "10px" } }}
              />
            </FormProvider>
          </div>

          <div className="mt-[40px] ">
            <Button
              onClick={handleSubmit(onSubmit)}
              className="bg-[#0F2A71] hover:bg-hoverBlue text-center text-white rounded-xl font-bold ml-2 font-ptSansNarrow text-[18px] "
              size="medium"
            >
              Notify Me
            </Button>
          </div>
        </div>
      </div>

      <div className="w-[950px]">
        <Image src={UnderMaintenance} alt="UnderMaintenance" />
      </div>
    </div>
  );
};
