import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { RxFileText, RxPerson } from "react-icons/rx";

export default function Page() {
    return (
        <div className="w-full h-full p-7">
            <p className="font-semibold text-2xl">Overview</p>
            <div className="flex flex-wrap mt-4">
                <Card className="cursor-pointer hover:shadow-md duration-75 w-full max-w-xs mr-4">
                    <div className="p-4 flex justify-between">
                        <CardTitle className="flex">Forms</CardTitle>
                        <RxFileText className="h-6 w-6" />
                    </div>
                    <CardContent>
                        <p className="text-4xl font-bold">13</p>
                    </CardContent>
                </Card>
                <Card className="cursor-pointer hover:shadow-md duration-75 w-full max-w-xs mr-4">
                    <div className="p-4 flex justify-between">
                        <CardTitle className="flex">Batches</CardTitle>
                        <RxPerson className="h-6 w-6" />
                    </div>
                    <CardContent>
                        <p className="text-4xl font-bold">13</p>
                    </CardContent>
                </Card>
                <Card className="cursor-pointer hover:shadow-md duration-75 w-full max-w-xs mr-4">
                    <div className="p-4 flex justify-between">
                        <CardTitle className="flex">Faculties</CardTitle>
                        <RxPerson className="h-6 w-6" />
                    </div>
                    <CardContent>
                        <p className="text-4xl font-bold">13</p>
                    </CardContent>
                </Card>
                <Card className="cursor-pointer hover:shadow-md duration-75 w-full max-w-xs mr-4">
                    <div className="p-4 flex justify-between">
                        <CardTitle className="flex">Students</CardTitle>
                        <RxPerson className="h-6 w-6" />
                    </div>
                    <CardContent>
                        <p className="text-4xl font-bold">13</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
