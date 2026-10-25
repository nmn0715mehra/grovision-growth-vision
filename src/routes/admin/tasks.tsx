import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/AdminShell";
import { useAdminStore, type SeoTask } from "@/lib/admin-store";
import { CheckSquare, Plus, Clock, CheckCircle2, Calendar, User, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/tasks")({
  head: () => ({
    meta: [
      { title: "SEO Action Tasks | GROVISION SEO" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: TasksPage,
});

function TasksPage() {
  const { tasks, addTask, updateTaskStatus } = useAdminStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("ALL");

  // New task form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<SeoTask["category"]>("Technical");
  const [priority, setPriority] = useState<SeoTask["priority"]>("High");
  const [dueDate, setDueDate] = useState("2026-10-31");
  const [assignee, setAssignee] = useState("SEO Specialist");

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addTask({
      title: title.trim(),
      description: description.trim() || "Action item for GROVISION search performance.",
      category,
      priority,
      status: "backlog",
      dueDate,
      assignee,
    });

    toast.success(`Task "${title}" created!`);
    setTitle("");
    setDescription("");
    setModalOpen(false);
  };

  const filteredTasks = tasks.filter((t) => {
    if (statusFilter === "ALL") return true;
    return t.status === statusFilter;
  });

  return (
    <AdminShell
      title="Actionable SEO Tasks"
      subtitle="Prioritized checklist of technical fixes, content deliverables, and optimization actions"
      actions={
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="bg-navy text-xs text-ivory hover:bg-navy-soft">
              <Plus className="mr-1.5 h-3.5 w-3.5" />
              New Task
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md bg-white border border-border">
            <DialogHeader>
              <DialogTitle className="font-display text-lg text-navy">
                Create Actionable Task
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4 pt-2">
              <div>
                <Label className="text-xs font-semibold text-navy">Task Title</Label>
                <Input
                  placeholder="e.g. Implement BreadcrumbList Schema on /services"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label className="text-xs font-semibold text-navy">
                  Description / Implementation Steps
                </Label>
                <Input
                  placeholder="Detailed guidelines or acceptance criteria..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-1 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs font-semibold text-navy">Category</Label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as SeoTask["category"])}
                    className="mt-1 w-full rounded border border-border bg-white p-2 text-xs text-navy"
                  >
                    <option value="Technical">Technical</option>
                    <option value="Content">Content</option>
                    <option value="On-Page">On-Page</option>
                    <option value="Off-Page">Off-Page</option>
                    <option value="Strategy">Strategy</option>
                  </select>
                </div>
                <div>
                  <Label className="text-xs font-semibold text-navy">Priority</Label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as SeoTask["priority"])}
                    className="mt-1 w-full rounded border border-border bg-white p-2 text-xs text-navy"
                  >
                    <option value="Critical">Critical</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs font-semibold text-navy">Target Due Date</Label>
                  <Input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="mt-1 text-xs"
                  />
                </div>
                <div>
                  <Label className="text-xs font-semibold text-navy">Assignee</Label>
                  <Input
                    value={assignee}
                    onChange={(e) => setAssignee(e.target.value)}
                    className="mt-1 text-xs"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setModalOpen(false)}
                  className="text-xs text-navy"
                >
                  Cancel
                </Button>
                <Button type="submit" className="bg-navy text-xs text-ivory hover:bg-navy-soft">
                  Create Task
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      }
    >
      <div className="space-y-6">
        {/* Status Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 rounded-lg border border-border bg-white p-3 shadow-sm">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mr-2">
            <Filter className="h-3.5 w-3.5" />
            <span>Filter Status:</span>
          </div>
          {[
            { label: "All Tasks", val: "ALL" },
            { label: "Backlog", val: "backlog" },
            { label: "In Progress", val: "in_progress" },
            { label: "Completed", val: "done" },
          ].map((tab) => (
            <Button
              key={tab.val}
              size="sm"
              variant={statusFilter === tab.val ? "default" : "outline"}
              onClick={() => setStatusFilter(tab.val)}
              className={`h-7 text-xs ${
                statusFilter === tab.val ? "bg-navy text-ivory" : "border-border text-navy"
              }`}
            >
              {tab.label}
            </Button>
          ))}
        </div>

        {/* Task Cards */}
        <div className="space-y-3">
          {filteredTasks.length === 0 ? (
            <div className="rounded-lg border border-border bg-white p-12 text-center text-xs text-muted-foreground">
              No tasks found in this status.
            </div>
          ) : (
            filteredTasks.map((t) => {
              const isDone = t.status === "done";
              return (
                <div
                  key={t.id}
                  className={`rounded-lg border p-4 shadow-sm transition-all ${
                    isDone
                      ? "border-emerald-200 bg-emerald-50/30 text-muted-foreground"
                      : "border-border bg-white"
                  }`}
                >
                  <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={isDone}
                        onChange={() => updateTaskStatus(t.id, isDone ? "in_progress" : "done")}
                        className="mt-1 h-4 w-4 rounded border-border text-navy focus:ring-gold"
                      />
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3
                            className={`font-display text-sm font-bold ${
                              isDone ? "line-through text-muted-foreground" : "text-navy"
                            }`}
                          >
                            {t.title}
                          </h3>
                          <Badge
                            className={`text-[10px] ${
                              t.priority === "Critical"
                                ? "bg-rose-100 text-rose-800"
                                : t.priority === "High"
                                  ? "bg-amber-100 text-amber-800"
                                  : "bg-slate-100 text-slate-800"
                            }`}
                          >
                            {t.priority}
                          </Badge>
                          <Badge variant="outline" className="border-navy/20 text-[10px] text-navy">
                            {t.category}
                          </Badge>
                        </div>

                        <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                          {t.description}
                        </p>

                        <div className="mt-2.5 flex items-center gap-4 text-[11px] text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3 text-gold" /> Due: {t.dueDate}
                          </span>
                          <span className="flex items-center gap-1">
                            <User className="h-3 w-3 text-gold" /> {t.assignee}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 sm:self-center">
                      <select
                        value={t.status}
                        onChange={(e) =>
                          updateTaskStatus(t.id, e.target.value as SeoTask["status"])
                        }
                        className="h-8 rounded border border-border bg-white px-2.5 text-xs text-navy font-medium"
                      >
                        <option value="backlog">Backlog</option>
                        <option value="in_progress">In Progress</option>
                        <option value="review">In Review</option>
                        <option value="done">Completed</option>
                      </select>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </AdminShell>
  );
}
