import { User } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton";
  
export function SelectUser({list}: {list:any}) {
    return (
      <Select>
        <SelectTrigger className="w-[180px] h-8">
          <SelectValue placeholder="Select a user" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Users</SelectLabel>
            {list.map((user:any) => (
            <SelectItem value={user.publicUserData.identifier}>
              {user.publicUserData.firstName && user.publicUserData.lastName ? `${user.publicUserData.firstName} ${user.publicUserData.lastName}`: user.publicUserData.identifier}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    )
}

export function AssignUser({membershipList}: {membershipList: any}) {
    return (
      <div className="w-full flex items-center justify-start gap-1">
            <User className="w-5 h-5 text-neutral-700" />
            <p className="font-semibold text-neutral-700">
                Assign User
            </p>
            <SelectUser list={membershipList} />
      </div>
    )
}

AssignUser.Skeleton = function() {
    return (
        <div className="flex items-start gap-x-3 mb-6">
        <Skeleton className="h-6 w-6 mt-1 bg-neutral-200" />
        <div className="flex">
          <Skeleton className="w-24 h-6 mb-1 bg-neutral-200" />
          <Skeleton className="w-[180px] h-8 bg-neutral-200" />
        </div>
      </div>
    )
}