
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavigationMenu from '@/components/NavigationMenu';
import { Separator } from '@/components/ui/separator';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Student, Attendance, Grade, StudentProgress } from '@/types/student';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calendar, Edit, FileText, Map, Phone, School, User, UserCheck } from 'lucide-react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

const StudentDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [student, setStudent] = useState<Student | null>(null);
  const [attendanceRecords, setAttendanceRecords] = useState<Attendance[]>([]);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [progress, setProgress] = useState<StudentProgress[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In real app, fetch data from API
    setLoading(true);

    // Mock data
    const mockStudent: Student = {
      id: 1,
      firstName: 'Fatou',
      lastName: 'Diallo',
      dateOfBirth: '2015-05-12',
      gender: 'F',
      class: 'A',
      level: 'CE2',
      parentContact: '+221 77 123 45 67',
      address: 'Rue 10, Dakar',
      enrollmentDate: '2022-09-05',
      status: 'active',
    };
    
    const mockAttendance: Attendance[] = [
      { id: 1, studentId: 1, date: '2025-04-01', status: 'present' },
      { id: 2, studentId: 1, date: '2025-04-02', status: 'present' },
      { id: 3, studentId: 1, date: '2025-04-03', status: 'late', reason: 'Embouteillage' },
      { id: 4, studentId: 1, date: '2025-04-04', status: 'present' },
      { id: 5, studentId: 1, date: '2025-04-07', status: 'absent', reason: 'Maladie' },
      { id: 6, studentId: 1, date: '2025-04-08', status: 'absent', reason: 'Maladie' },
      { id: 7, studentId: 1, date: '2025-04-09', status: 'present' },
    ];
    
    const mockGrades: Grade[] = [
      { id: 1, studentId: 1, subjectId: 1, evaluationId: 1, term: 'Trimestre 1', score: 15, maxScore: 20, date: '2024-11-15' },
      { id: 2, studentId: 1, subjectId: 2, evaluationId: 2, term: 'Trimestre 1', score: 17, maxScore: 20, date: '2024-11-20' },
      { id: 3, studentId: 1, subjectId: 3, evaluationId: 3, term: 'Trimestre 1', score: 14, maxScore: 20, date: '2024-11-25' },
      { id: 4, studentId: 1, subjectId: 1, evaluationId: 4, term: 'Trimestre 2', score: 16, maxScore: 20, date: '2025-02-15' },
      { id: 5, studentId: 1, subjectId: 2, evaluationId: 5, term: 'Trimestre 2', score: 18, maxScore: 20, date: '2025-02-20' },
    ];
    
    const mockProgress: StudentProgress[] = [
      { id: 1, studentId: 1, competency: 'Compréhension de texte', level: 'acquired', comments: 'Bonne progression', date: '2024-12-15' },
      { id: 2, studentId: 1, competency: 'Opérations mathématiques', level: 'mastered', comments: 'Excellente maîtrise', date: '2025-01-20' },
      { id: 3, studentId: 1, competency: 'Expression écrite', level: 'in_progress', comments: 'En amélioration', date: '2025-02-10' },
      { id: 4, studentId: 1, competency: 'Lecture à voix haute', level: 'acquired', comments: 'Bonne fluidité', date: '2025-03-05' },
    ];

    // Simulate API call
    setTimeout(() => {
      setStudent(mockStudent);
      setAttendanceRecords(mockAttendance);
      setGrades(mockGrades);
      setProgress(mockProgress);
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <NavigationMenu />
        <div className="p-8 flex justify-center items-center">
          <p>Chargement des données...</p>
        </div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="min-h-screen bg-background">
        <NavigationMenu />
        <div className="p-8 flex justify-center items-center">
          <p>Élève non trouvé</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <NavigationMenu />
      
      <div className="p-4 md:p-8">
        <header className="mb-6 flex flex-wrap justify-between items-start gap-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <div className="bg-primary/20 text-primary rounded-full h-full w-full flex items-center justify-center text-xl font-semibold">
                {student.firstName.charAt(0)}{student.lastName.charAt(0)}
              </div>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold">{student.firstName} {student.lastName}</h1>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-muted-foreground mt-1">
                <div className="flex items-center gap-1">
                  <School className="h-4 w-4" />
                  <span>Classe: {student.level} {student.class}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>Né(e) le: {new Date(student.dateOfBirth).toLocaleDateString('fr-FR')}</span>
                </div>
                <div className="flex items-center gap-1">
                  <UserCheck className="h-4 w-4" />
                  <span>Statut: {
                    student.status === 'active' ? 'Actif' :
                    student.status === 'inactive' ? 'Inactif' :
                    'Transféré'
                  }</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate(`/students/edit/${student.id}`)}>
              <Edit className="mr-2 h-4 w-4" />
              Modifier
            </Button>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="default">
                  <FileText className="mr-2 h-4 w-4" />
                  Bulletin Scolaire
                </Button>
              </SheetTrigger>
              <SheetContent className="sm:max-w-[600px]">
                <SheetHeader>
                  <SheetTitle>Bulletin Scolaire - {student.firstName} {student.lastName}</SheetTitle>
                  <SheetDescription>
                    Niveau: {student.level} {student.class} - Année scolaire 2024-2025
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-6">
                  <Tabs defaultValue="term1">
                    <TabsList className="grid grid-cols-3 mb-4">
                      <TabsTrigger value="term1">Trimestre 1</TabsTrigger>
                      <TabsTrigger value="term2">Trimestre 2</TabsTrigger>
                      <TabsTrigger value="term3">Trimestre 3</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="term1">
                      {renderGradesTable("Trimestre 1")}
                      <Button className="mt-4 w-full">Imprimer le bulletin</Button>
                    </TabsContent>
                    
                    <TabsContent value="term2">
                      {renderGradesTable("Trimestre 2")}
                      <Button className="mt-4 w-full">Imprimer le bulletin</Button>
                    </TabsContent>
                    
                    <TabsContent value="term3">
                      <div className="text-center py-10 text-muted-foreground">
                        Les notes du 3ème trimestre ne sont pas encore disponibles.
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </header>

        <Separator className="my-6" />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Information personnelle */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Information Personnelle
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Genre</p>
                  <p>{student.gender === 'M' ? 'Masculin' : 'Féminin'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Date d'inscription</p>
                  <p>{new Date(student.enrollmentDate).toLocaleDateString('fr-FR')}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Contact Parent</p>
                  <p className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    {student.parentContact}
                  </p>
                </div>
                {student.address && (
                  <div>
                    <p className="text-sm text-muted-foreground">Adresse</p>
                    <p className="flex items-center gap-2">
                      <Map className="h-4 w-4" />
                      {student.address}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          {/* Assiduité Récente */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Assiduité Récente
              </CardTitle>
              <CardDescription>7 derniers jours de présence</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Raison</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {attendanceRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell>{new Date(record.date).toLocaleDateString('fr-FR')}</TableCell>
                      <TableCell>
                        <div className={`px-2 py-1 rounded-full text-xs inline-flex items-center ${
                          record.status === 'present' ? 'bg-green-100 text-green-800' :
                          record.status === 'absent' ? 'bg-red-100 text-red-800' :
                          record.status === 'late' ? 'bg-amber-100 text-amber-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {record.status === 'present' ? 'Présent' :
                           record.status === 'absent' ? 'Absent' :
                           record.status === 'late' ? 'En retard' :
                           'Excusé'}
                        </div>
                      </TableCell>
                      <TableCell>{record.reason || '-'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-6">
          <Tabs defaultValue="grades">
            <TabsList className="mb-6">
              <TabsTrigger value="grades">Notes & Évaluations</TabsTrigger>
              <TabsTrigger value="progress">Progression des Compétences</TabsTrigger>
            </TabsList>
            
            <TabsContent value="grades">
              <Card>
                <CardHeader>
                  <CardTitle>Notes & Évaluations</CardTitle>
                  <CardDescription>Historique des évaluations et des notes</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Matière</TableHead>
                        <TableHead>Trimestre</TableHead>
                        <TableHead className="text-right">Note</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {grades.map((grade) => (
                        <TableRow key={grade.id}>
                          <TableCell>{new Date(grade.date).toLocaleDateString('fr-FR')}</TableCell>
                          <TableCell>
                            {grade.subjectId === 1 ? 'Français' : 
                             grade.subjectId === 2 ? 'Mathématiques' : 
                             grade.subjectId === 3 ? 'Sciences' : 'Autre'}
                          </TableCell>
                          <TableCell>{grade.term}</TableCell>
                          <TableCell className="text-right font-medium">
                            {grade.score}/{grade.maxScore}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="progress">
              <Card>
                <CardHeader>
                  <CardTitle>Progression des Compétences</CardTitle>
                  <CardDescription>Suivi du niveau d'acquisition des compétences clés</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Compétence</TableHead>
                        <TableHead>Niveau</TableHead>
                        <TableHead>Date d'évaluation</TableHead>
                        <TableHead>Commentaire</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {progress.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>{item.competency}</TableCell>
                          <TableCell>
                            <div className={`px-2 py-1 rounded-full text-xs inline-flex items-center ${
                              item.level === 'mastered' ? 'bg-green-100 text-green-800' :
                              item.level === 'acquired' ? 'bg-blue-100 text-blue-800' :
                              item.level === 'in_progress' ? 'bg-amber-100 text-amber-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {item.level === 'mastered' ? 'Maîtrisé' :
                               item.level === 'acquired' ? 'Acquis' :
                               item.level === 'in_progress' ? 'En progression' :
                               'Non acquis'}
                            </div>
                          </TableCell>
                          <TableCell>{new Date(item.date).toLocaleDateString('fr-FR')}</TableCell>
                          <TableCell>{item.comments || '-'}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );

  function renderGradesTable(term: string) {
    const termGrades = grades.filter(g => g.term === term);
    let totalScore = 0;
    let totalMaxScore = 0;
    
    termGrades.forEach(grade => {
      totalScore += grade.score;
      totalMaxScore += grade.maxScore;
    });
    
    const averageScore = totalMaxScore > 0 ? (totalScore / totalMaxScore) * 20 : 0;
    
    return (
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Matière</TableHead>
              <TableHead className="text-right">Note</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {termGrades.map((grade) => (
              <TableRow key={grade.id}>
                <TableCell>
                  {grade.subjectId === 1 ? 'Français' : 
                   grade.subjectId === 2 ? 'Mathématiques' : 
                   grade.subjectId === 3 ? 'Sciences' : 'Autre'}
                </TableCell>
                <TableCell className="text-right font-medium">
                  {grade.score}/{grade.maxScore}
                </TableCell>
              </TableRow>
            ))}
            <TableRow className="bg-muted/50 font-medium">
              <TableCell>Moyenne Générale</TableCell>
              <TableCell className="text-right">{averageScore.toFixed(2)}/20</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    );
  }
};

export default StudentDetail;
