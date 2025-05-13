
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { MentoringSession } from "@/components/mentor/form/types";
import { Calendar, Clock, Trash2 } from "lucide-react";
import { format, parseISO } from "date-fns";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

const SessionStatusBadge = ({ status }: { status: MentoringSession['status'] }) => {
  const statusColors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    confirmed: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
    completed: "bg-blue-100 text-blue-800"
  };

  return (
    <Badge variant="outline" className={`${statusColors[status]} border-none`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
};

export const SessionsTab = () => {
  const { user } = useAuth();
  const [sessions, setSessions] = useState<MentoringSession[]>([]);
  const [loading, setLoading] = useState(true);
  const isMentor = user?.user_metadata?.is_mentor || user?.user_metadata?.user_type === "mentor";

  useEffect(() => {
    if (!user) return;
    
    const fetchSessions = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('mentoring_sessions')
          .select('*')
          .eq(isMentor ? 'mentor_id' : 'student_id', user.id)
          .order('start_time', { ascending: true });
        
        if (error) throw error;
        setSessions(data as MentoringSession[]);
      } catch (error: any) {
        console.error('Error fetching sessions:', error);
        toast({
          variant: "destructive",
          title: "Failed to load sessions",
          description: error.message || "Please try again later"
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchSessions();
  }, [user, isMentor]);

  const handleUpdateStatus = async (sessionId: string, newStatus: MentoringSession['status']) => {
    try {
      const { error } = await supabase
        .from('mentoring_sessions')
        .update({ status: newStatus })
        .eq('id', sessionId);
      
      if (error) throw error;
      
      setSessions(currentSessions => 
        currentSessions.map(session => 
          session.id === sessionId ? { ...session, status: newStatus } : session
        )
      );
      
      toast({
        title: "Session updated",
        description: `The session status was updated to ${newStatus}`
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error updating session",
        description: error.message || "Please try again"
      });
    }
  };

  const handleDeleteSession = async (sessionId: string) => {
    try {
      const { error } = await supabase
        .from('mentoring_sessions')
        .delete()
        .eq('id', sessionId);
      
      if (error) throw error;
      
      // Remove the deleted session from state
      setSessions(currentSessions => 
        currentSessions.filter(session => session.id !== sessionId)
      );
      
      toast({
        title: "Session deleted",
        description: "The session has been removed from your schedule"
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error deleting session",
        description: error.message || "Please try again"
      });
    }
  };

  if (loading) {
    return <div className="flex justify-center py-8">Loading your sessions...</div>;
  }

  if (sessions.length === 0) {
    return (
      <div className="text-center py-10">
        <h3 className="text-lg font-medium mb-2">No sessions found</h3>
        <p className="text-gray-500">
          {isMentor 
            ? "You don't have any mentoring sessions scheduled yet." 
            : "You haven't booked any mentoring sessions yet."}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">
        {isMentor ? "My Mentoring Schedule" : "My Booked Sessions"}
      </h2>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date & Time</TableHead>
            <TableHead>Session</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sessions.map((session) => (
            <TableRow key={session.id}>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span>{format(parseISO(session.start_time), "MMM d, yyyy")}</span>
                </div>
                <div className="flex items-center space-x-2 mt-1 text-sm text-gray-500">
                  <Clock className="h-4 w-4" />
                  <span>
                    {format(parseISO(session.start_time), "h:mm a")} - 
                    {format(parseISO(session.end_time), "h:mm a")}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <div className="font-medium">{session.title}</div>
                {session.description && (
                  <div className="text-sm text-gray-500 line-clamp-1">{session.description}</div>
                )}
              </TableCell>
              <TableCell>
                <SessionStatusBadge status={session.status} />
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end space-x-2">
                  {isMentor && session.status === 'pending' && (
                    <>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleUpdateStatus(session.id, 'confirmed')}
                      >
                        Confirm
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="text-red-500"
                        onClick={() => handleUpdateStatus(session.id, 'cancelled')}
                      >
                        Decline
                      </Button>
                    </>
                  )}
                  {isMentor && session.status === 'confirmed' && (
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="text-blue-500"
                      onClick={() => handleUpdateStatus(session.id, 'completed')}
                    >
                      Mark Completed
                    </Button>
                  )}
                  
                  {/* Add delete button for all sessions */}
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="text-red-500"
                    onClick={() => handleDeleteSession(session.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SessionsTab;
