
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Student } from '@/types/student';
import { Link } from 'react-router-dom';
import { BookOpen, Calendar, MapPin, User } from 'lucide-react';

interface StudentCardProps {
  student: Student;
}

const StudentCard: React.FC<StudentCardProps> = ({ student }) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-all border border-border/50">
      <CardHeader className="bg-muted/30 p-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12">
            <div className="bg-primary/20 text-primary rounded-full h-full w-full flex items-center justify-center text-lg font-semibold">
              {student.firstName.charAt(0)}{student.lastName.charAt(0)}
            </div>
          </Avatar>
          <div>
            <CardTitle className="text-lg">{student.firstName} {student.lastName}</CardTitle>
            <CardDescription className="flex items-center gap-1">
              <User className="h-3.5 w-3.5" />
              Niveau {student.level}, {student.class}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>Né(e) le: {new Date(student.dateOfBirth).toLocaleDateString('fr-FR')}</span>
          </div>
          {student.address && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{student.address}</span>
            </div>
          )}
          <div className="flex items-center gap-2 text-muted-foreground">
            <BookOpen className="h-4 w-4" />
            <span>Inscrit(e) le: {new Date(student.enrollmentDate).toLocaleDateString('fr-FR')}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex justify-end">
        <Button variant="outline" size="sm" asChild>
          <Link to={`/students/${student.id}`}>
            Voir le profil
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default StudentCard;
