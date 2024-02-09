"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "../ui/button";
import { useState, useTransition, useRef, ElementRef } from "react";
import { updateUser } from "@/actions/user";
import { toast } from "sonner";

interface BioModalProps {
  initialValue: string | null;
}

export const BioModal = ({ initialValue }: BioModalProps) => {
  const [isPending, startTransition] = useTransition();
  const closeRef = useRef<ElementRef<"button">>(null);
  const [value, setValue] = useState(initialValue || "");
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(() => {
      updateUser({
        bio: value,
      })
        .then(() => {
          toast.success("User bio updated");
          closeRef?.current?.click();
        })
        .catch(() => toast.error("Something went wrong"));
    });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="ml-auto" size="sm" variant="link">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit user bio</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <Textarea
            placeholder="User Bio"
            onChange={(e) => setValue(e.target.value)}
            value={value}
            disabled={isPending}
            className="resize-none"
          />
          <div className="flex justify-between">
            <DialogClose asChild ref={closeRef}>
              <Button type="button" variant="ghost">
                Cancel
              </Button>
            </DialogClose>
            <Button disabled={isPending} type="submit" variant="primary">
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
