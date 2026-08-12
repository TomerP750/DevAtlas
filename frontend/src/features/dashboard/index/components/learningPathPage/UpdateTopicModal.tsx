import { Modal } from "../../../../../shared/ui/Modal";
import { Input } from "../../../../../shared/ui/Input";
import { useForm } from "react-hook-form";
import { QueryClient, useMutation } from "@tanstack/react-query";
import type { TopicDto } from "../../models/topic/TopicDto";
import type { UpdateTopicDto } from "../../models/topic/UpdateTopicDto";
import { Button } from "../../../../../shared/ui/Button";

interface UpdateTopicModalProps {
    isOpen: boolean;
    onClose: () => void;
    topic: TopicDto;
}

export function UpdateTopicModal({ isOpen, onClose, topic }: UpdateTopicModalProps) {

    if (!isOpen) return null;

    const { register, handleSubmit, formState: { errors } } = useForm<UpdateTopicDto>()

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Update Topic" description="Update the topic details">
            <form action="">
                <div className="grid grid-cols-1 gap-4">
                    <div className="col-span-1">
                        <Input
                            id="name"
                            label="Name"
                            placeholder="Enter the topic name"
                            {...register("name")}
                            error={errors.name?.message}
                        />
                    </div>
                    <div className="col-span-1">
                        <Input
                            id="description"
                            label="Description"
                            placeholder="Enter the topic description"
                            {...register("description")}
                            error={errors.description?.message}
                        />
                    </div>
                    <div className="col-span-1">
                        <Button type="submit">Update Topic</Button>
                    </div>
                </div>
            </form>
        </Modal>
    );
}