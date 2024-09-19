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
  import { useAction } from "@/hooks/use-action";
  import { assignCardUser } from "@/actions/assign-card-user";
  import { toast } from 'sonner';
  import { useParams } from "next/navigation";
  import { Skeleton } from "@/components/ui/skeleton";
  import { SelectUser } from "./_components/selectUser";


  interface AssignUserComponent extends React.FC<{assignedUserId: any, cardId: string, membershipList: any}> {
    Skeleton: React.FC;
    displayName?: string;
  }
  

export const  AssignUser: AssignUserComponent = ({assignedUserId ,cardId, membershipList}: {assignedUserId: any, cardId: string, membershipList: any}) => {
    return (
      <div className="w-full flex items-center justify-start gap-1">
            <User className="w-5 h-5 text-neutral-700" />
            <p className="font-semibold text-neutral-700">
                Assign User
            </p>
            <SelectUser assignedUserId={assignedUserId} cardId={cardId} list={membershipList} />
      </div>
    )
}

// Add displayName to AssignUser component
AssignUser.displayName = "AssignUser";

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

// Add displayName to AssignUser.Skeleton component
AssignUser.Skeleton.displayName = "AssignUserSkeleton";