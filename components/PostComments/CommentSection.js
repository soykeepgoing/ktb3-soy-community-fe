import { h } from "../../core/vdom/h.js";
import { useState } from "../../core/hooks/useState.js";
import { useEffect } from "../../core/hooks/useEffect.js";
import { getComments, createComment, deleteComments, editComment } from "../../api/commentApi.js";
import { CommentForm } from "./CommentForm/CommentForm.js";
import { CommentItemList } from "./CommentItemList/CommentItemList.js";
import { getState } from "../../core/GlobalStore.js";

export function CommentSection({postId}){
    const [comments, setComments] = useState([]);
    const [value, setValue] = useState("");
    const [ mode, setMode] = useState({type: "create"});

    useEffect(() => {
        if (!postId) return;
        const fetchComments = async () => {
            const res = await getComments(postId);
            if (res?.success){
                setComments(res.data ?? []);
            }
        };
        fetchComments();
    }, [postId]);

    const resetForm = () => {
        setMode({type: "create", targetId: null});
        setValue("");
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const text = value.trim();
        if (!text) return;

        if (mode.type === "edit" && mode.targetId){
            const res = await editComment({
                newCommentContent: text
            }, postId, mode.targetId);
            if (res?.success){
                setComments(comments.map((c) => c.id === mode.targetId ? { ... c, body: text} : c));
                resetForm();
            }
            return ;
        }

        const res = await createComment({
            inputData: text,
            postId
        });

        if (res?.success){
            setComments([...comments, res.data]);
            resetForm();
        }
    };

    const handleDelete = async (commentId) => {
        const res = await deleteComments(postId, commentId);
        if (res?.success){
            setComments(comments.filter((c) => c.id !== commentId));
            if (mode.type === "edit" && mode.targetId === commentId) {
                resetForm();
            }
        }
    }

    const handleEdit = async (comment) => {
        setMode({type: "edit", targetId: comment.id});
        setValue(comment.body ?? "");
    }

    return h(
        "section", 
        {className: "comment-section"}, 
        CommentForm({
            mode: mode.type, 
            value, 
            onChange: setValue, 
            onSubmit: handleSubmit, 
            onCancel: resetForm
        }), 
        CommentItemList({
            comments, 
            onEdit: handleEdit, 
            onDelete: handleDelete
        })
    )

}