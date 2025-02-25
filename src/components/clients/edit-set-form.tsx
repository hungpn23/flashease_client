"use client";

import { useActionState, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";
import { showErrorBorder } from "@/lib/show-error-border";
import { showErrorDetail } from "@/lib/show-error-detail";
import { Check } from "lucide-react";
import { DialogClose, DialogFooter } from "../ui/dialog";
import { editSet } from "@/actions/set/edit-set.action";
import { EditableBy, VisibleTo } from "@/lib/constants";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  EditSetInputType,
  EditSetStateType,
  SetType,
} from "@/types/data/set.type";
import toast from "react-hot-toast";

export function EditSetForm({ set }: { set: SetType }) {
  const [id, _setId] = useState<string>(set.id);
  const [name, setName] = useState<string>(set.name);
  const [description, setDescription] = useState<string>(set.description || "");
  const [visibleTo, setVisibleTo] = useState<VisibleTo>(set.visibleTo);
  const [visibleToPassword, setVisibleToPassword] = useState<string>(
    set.visibleToPassword || "",
  );
  const [editableBy, setEditableBy] = useState<EditableBy>(set.editableBy);
  const [editableByPassword, setEditableByPassword] = useState<string>(
    set.editableByPassword || "",
  );

  const initState: EditSetStateType = {
    input: {
      id,
      name,
      description,
      visibleTo,
      visibleToPassword,
      editableBy,
      editableByPassword,
    } as EditSetInputType,
    success: false,
  };

  const [state, action, isLoading] = useActionState<EditSetStateType, FormData>(
    editSet,
    initState,
  );

  useEffect(() => {
    if (state.error && state.error.details === undefined) {
      toast.error(state.error?.message);
    }
  }, [state, toast]);

  const errorDetails = state.error?.details;

  return (
    <form className="grid gap-2 py-4" action={action}>
      <input type="hidden" name="id" value={id} />

      {/* Name */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Name
        </Label>

        <Input
          className={cn(
            "col-span-3",
            errorDetails && showErrorBorder(errorDetails, "name"),
          )}
          name="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          tabIndex={1}
          autoFocus
        />

        <div className="col-span-3 col-start-2">
          {errorDetails && showErrorDetail(errorDetails, "name")}
        </div>
      </div>

      {/* Description */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="description" className="text-right">
          Description
        </Label>

        <Textarea
          className={cn(
            "col-span-3",
            errorDetails && showErrorBorder(errorDetails, "description"),
          )}
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          tabIndex={2}
        />

        <div className="col-span-3 col-start-2">
          {errorDetails && showErrorDetail(errorDetails, "description")}
        </div>
      </div>

      {/* VisibleTo */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="visibleTo" className="text-right">
          VisibleTo
        </Label>

        <Select
          name="visibleTo"
          value={visibleTo}
          onValueChange={(value) => setVisibleTo(value as VisibleTo)}
        >
          <SelectTrigger
            className={cn(
              errorDetails && showErrorBorder(errorDetails, "visibleTo"),
            )}
            tabIndex={3}
          >
            <SelectValue placeholder={set.visibleTo} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value={VisibleTo.EVERYONE}>everyone</SelectItem>
              <SelectItem value={VisibleTo.JUST_ME}>just me</SelectItem>
              <SelectItem value={VisibleTo.PEOPLE_WITH_A_PASSWORD}>
                people with a password
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Input
          className={cn(
            "col-span-2",
            errorDetails && showErrorBorder(errorDetails, "visibleToPassword"),
          )}
          name="visibleToPassword"
          type={
            visibleTo === VisibleTo.PEOPLE_WITH_A_PASSWORD ? "text" : "hidden"
          }
          value={visibleToPassword}
          onChange={(e) => setVisibleToPassword(e.target.value)}
          tabIndex={4}
          placeholder="enter your password"
        />

        <div className="col-span-3 col-start-2">
          {errorDetails && showErrorDetail(errorDetails, "visibleToPassword")}
        </div>
      </div>

      {/* EditableBy */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="editableBy" className="text-right">
          EditableBy
        </Label>

        <Select
          name="editableBy"
          value={editableBy}
          onValueChange={(value) => setEditableBy(value as EditableBy)}
        >
          <SelectTrigger
            className={cn(
              errorDetails && showErrorBorder(errorDetails, "editableBy"),
            )}
            tabIndex={3}
          >
            <SelectValue placeholder={set.editableBy} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value={EditableBy.JUST_ME}>just me</SelectItem>
              <SelectItem value={EditableBy.PEOPLE_WITH_A_PASSWORD}>
                people with a password
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Input
          className={cn(
            "col-span-2",
            errorDetails && showErrorBorder(errorDetails, "editableByPassword"),
          )}
          name="editableByPassword"
          type={
            editableBy === EditableBy.PEOPLE_WITH_A_PASSWORD ? "text" : "hidden"
          }
          value={editableByPassword}
          onChange={(e) => setEditableByPassword(e.target.value)}
          tabIndex={5}
          placeholder="enter your password"
        />

        <div className="col-span-3 col-start-2">
          {errorDetails && showErrorDetail(errorDetails, "editableByPassword")}
        </div>
      </div>

      <DialogFooter>
        <div className="flex items-center gap-4">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>

          <Button disabled={isLoading} variant="default" type="submit">
            Save changes
          </Button>

          <Check
            className={cn(
              "h-4 w-4",
              state.success ? "text-green-500" : "invisible",
            )}
          />
        </div>
      </DialogFooter>
    </form>
  );
}
