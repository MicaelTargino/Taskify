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
import { useAction } from "@/hooks/use-action";
import { assignCardUser } from "@/actions/assign-card-user";
import { toast } from 'sonner';
import { useParams } from "next/navigation";

  
export function SelectUser({cardId,list}: {cardId:string,list:any}) {
    const params = useParams();
    const {execute, fieldErrors} = useAction(assignCardUser, {
        onSuccess: (data) => {
            toast.success(`Card "${data.title}" updated`);
        },
        onError: (err) => {
            toast.error(err)
        }
    })

    const onSubmit = (assignedUserId: string) => {
        const boardId = params.boardId as string;

        execute({cardId, assignedUserId, boardId})   
    }

    return (

      <Select onValueChange={(value) => onSubmit(value)}>
        <SelectTrigger className="w-[180px] h-8">
          <SelectValue placeholder="Select a user" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Users</SelectLabel>
            {list.map((user:any) => (
            <SelectItem  value={user.publicUserData.userId}>
              {user.publicUserData.firstName && user.publicUserData.lastName ? `${user.publicUserData.firstName} ${user.publicUserData.lastName}`: user.publicUserData.identifier}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    )
}

export function AssignUser({cardId, membershipList}: {cardId: string, membershipList: any}) {
    return (
      <div className="w-full flex items-center justify-start gap-1">
            <User className="w-5 h-5 text-neutral-700" />
            <p className="font-semibold text-neutral-700">
                Assign User
            </p>
            <SelectUser cardId={cardId} list={membershipList} />
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