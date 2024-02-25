import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
import { useAction } from "@/hooks/use-action";
import { assignCardUser } from "@/actions/assign-card-user";
import { toast } from 'sonner';
import { useParams } from "next/navigation";

export function SelectUser({assignedUserId, cardId,list}: {assignedUserId: any,cardId:string,list:any}) {
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
      <Select onValueChange={(value) => onSubmit(value)} defaultValue={assignedUserId}>
        <SelectTrigger className="w-[180px] h-8">
          <SelectValue placeholder="Select a user" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Users</SelectLabel>
            {list.map((user:any) => (
            <SelectItem key={user.publicUserData.id} value={user.publicUserData.userId}>
              {user.publicUserData.firstName && user.publicUserData.lastName ? `${user.publicUserData.firstName} ${user.publicUserData.lastName}`: user.publicUserData.identifier}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    )
}
