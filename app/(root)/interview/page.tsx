import Agent from "@/components/Agent";
import InterviewTypeForm from "@/components/InterviewTypeForm";
import { getCurrentUser } from "@/lib/actions/auth.action";

const Page = async () => {
  const user = await getCurrentUser();

  return (
    <>
      <h3>Interview generation</h3>

      <Agent
        userName={user?.name!}
        userId={user?.id}
        profileImage={user?.profileURL}
        type="generate"
      />
      <InterviewTypeForm userId={user?.id} userName={user?.name!} />
    </>
  );
};

export default Page;
