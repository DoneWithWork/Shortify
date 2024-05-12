import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="w-full flex flex-col items-center justify-center h-screen">
      <SignUp path="/sign-up" />
    </div>
  );
}
