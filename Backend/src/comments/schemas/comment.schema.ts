import { Document, Types } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
    timestamps: {
        createdAt: true,// solamente el campo createdAt
        updatedAt: false
    }
})
export class Comment extends Document {

    @Prop({ type: Types.ObjectId, ref: "Post", required: true })// Relación con el esquema de Post
    postId: string;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    body: string;

}

export const CommentSchema = SchemaFactory.createForClass(Comment);