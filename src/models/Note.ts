import mongoose, { Schema, Document } from "mongoose";
import { ICategory } from "./Category";

export interface INote extends Document {
  title: string;
  content: string;
  category: ICategory["_id"];
}

const NoteSchema = new Schema<INote>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
});

export const Note = mongoose.model<INote>("Note", NoteSchema);
