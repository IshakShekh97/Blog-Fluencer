import { DeleteSiteAction } from "@/actions/site-action";
import UploadImageForm from "@/app/dashboard/_components/form/UploadImageForm";
import SubmitBtn from "@/components/SubmitBtn";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MoveLeft } from "lucide-react";
import Link from "next/link";

const SettingsPage = ({ params }: { params: { siteId: string } }) => {
  return (
    <>
      <div className="flex items-center gap-x-2">
        <Button asChild size={"icon"} variant={"outline"} className="mr-3">
          <Link href={`/dashboard/sites/${params.siteId}`}>
            <MoveLeft className="size-4" />
          </Link>
        </Button>

        <h1 className="text-2xl font-extrabold">Settings Page</h1>
      </div>

      <UploadImageForm siteId={params.siteId} />

      <Card className="border-rose-500  dark:bg-rose-500/5 bg-rose-500/10">
        <CardHeader>
          <CardTitle className="text-destructive">Danger Zone !</CardTitle>
          <CardDescription>
            This Will Delete Your Site and All Articles created in it. Are you
            sure you want to delete this site?
            <br />
            Click the button below to delete
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <form action={DeleteSiteAction}>
            <input type="hidden" name="siteId" value={params.siteId} />
            <SubmitBtn
              loadingText="Deleting Site"
              text="Delete Everything"
              variant={"destructive"}
            />
          </form>
        </CardFooter>
      </Card>
    </>
  );
};

export default SettingsPage;
