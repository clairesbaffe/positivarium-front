import type { Comment } from "@/lib/definitions";
import Button from "@/components/Button";

export default function CommentCard({ comment }: { comment: Comment }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between">
        <p className="font-bold">{comment.username}</p>
        <Button
          title={"Signaler"}
          background={""}
          textColor={"text-red-400"}
          icon={null}
          href={"/"}
          priority="low"
        />
      </div>
      <p>{comment.content}</p>
    </div>
  );
}
