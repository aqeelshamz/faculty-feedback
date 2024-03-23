import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FiFilter } from "react-icons/fi";

export default function Page() {
    return (
        <div className="w-full h-full p-7">
            <p className="font-semibold text-2xl mb-4">Students</p>
            <div className="flex justify-between">
                <Button>+ New Student</Button>
                <div className="flex">
                    <Input className="mr-4" type="text" placeholder="Search students..." />
                    <Button variant="outline"><FiFilter className="mr-2" /> View</Button>
                </div>
            </div>
        </div>
    );
}
