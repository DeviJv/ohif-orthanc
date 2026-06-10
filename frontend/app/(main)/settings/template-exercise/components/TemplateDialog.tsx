import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TemplateExercise } from "../types";

interface TemplateDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    doctors: any[];
    initialData: TemplateExercise | null;
    onSave: (data: { userId: string, nama: string, template: string }) => Promise<void>;
}

export function TemplateDialog({ open, onOpenChange, doctors, initialData, onSave }: TemplateDialogProps) {
    const [userId, setUserId] = useState("");
    const [nama, setNama] = useState("");
    const [template, setTemplate] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (initialData) {
            setUserId(initialData.userId);
            setNama(initialData.nama);
            setTemplate(initialData.template);
        } else {
            setUserId("");
            setNama("");
            setTemplate("");
        }
    }, [initialData, open]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!userId || !nama || !template) return;
        setIsSubmitting(true);
        await onSave({ userId, nama, template });
        setIsSubmitting(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>{initialData ? "Edit Template" : "Add New Template"}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label>Doctor</Label>
                        <Select value={userId} onValueChange={(val) => setUserId(val || "")} required>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a doctor" />
                            </SelectTrigger>
                            <SelectContent>
                                {doctors.map((doc) => (
                                    <SelectItem key={doc.id} value={doc.id}>
                                        {doc.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label>Template Name</Label>
                        <Input 
                            value={nama} 
                            onChange={(e) => setNama(e.target.value)} 
                            placeholder="Enter template name..."
                            required 
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Template Exercise</Label>
                        <Textarea 
                            value={template} 
                            onChange={(e) => setTemplate(e.target.value)} 
                            placeholder="Type the exercise content here..."
                            rows={8}
                            required 
                        />
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Saving..." : "Save"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

