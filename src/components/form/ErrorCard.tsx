// import { Header } from ""

import Link from "next/link";
import { Button } from "../ui/button";
import { Card, CardFooter, CardHeader } from "../ui/card";

const ErrorCard = ({ redirect = "/auth/log-in" }: { redirect?: string }) => {
  return (
    <Card className="w-[400px] shadow-md mx-auto mt-16">
      <CardHeader className="text-red-500">
        Oops! Somthing went worng !
      </CardHeader>
      <CardFooter>
        <Button asChild>
          <Link href={redirect}>Back to login</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ErrorCard;
