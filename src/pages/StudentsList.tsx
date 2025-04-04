
import React, { useState, useEffect } from 'react';
import NavigationMenu from '@/components/NavigationMenu';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Plus, Users } from 'lucide-react';
import StudentCard from '@/components/StudentCard';
import StudentFilter from '@/components/StudentFilter';
import { Student } from '@/types/student';

const StudentsList = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [classFilter, setClassFilter] = useState('');
  const [levelFilter, setLevelFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  
  const navigate = useNavigate();

  useEffect(() => {
    // Mock data - in a real app, this would come from your API
    const mockStudents: Student[] = [
      {
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
      },
      {
        id: 2,
        firstName: 'Ousmane',
        lastName: 'Ndiaye',
        dateOfBirth: '2014-08-23',
        gender: 'M',
        class: 'B',
        level: 'CM1',
        parentContact: '+221 78 765 43 21',
        address: 'Avenue Cheikh Anta Diop, Dakar',
        enrollmentDate: '2021-09-10',
        status: 'active',
      },
      {
        id: 3,
        firstName: 'Aminata',
        lastName: 'Sow',
        dateOfBirth: '2014-03-15',
        gender: 'F',
        class: 'A',
        level: 'CM1',
        parentContact: '+221 76 456 78 90',
        address: 'Rue des Écoles, Saint-Louis',
        enrollmentDate: '2020-09-12',
        status: 'active',
      },
      {
        id: 4,
        firstName: 'Ibrahima',
        lastName: 'Ba',
        dateOfBirth: '2016-11-30',
        gender: 'M',
        class: 'C',
        level: 'CE1',
        parentContact: '+221 70 234 56 78',
        enrollmentDate: '2023-09-01',
        status: 'active',
      },
      {
        id: 5,
        firstName: 'Mariama',
        lastName: 'Seck',
        dateOfBirth: '2015-07-08',
        gender: 'F',
        class: 'B',
        level: 'CE2',
        parentContact: '+221 77 890 12 34',
        enrollmentDate: '2022-09-05',
        status: 'inactive',
      },
      {
        id: 6,
        firstName: 'Abdoulaye',
        lastName: 'Diop',
        dateOfBirth: '2013-02-20',
        gender: 'M',
        class: 'A',
        level: 'CM2',
        parentContact: '+221 76 345 67 89',
        address: 'Quartier Médina, Thiès',
        enrollmentDate: '2019-09-15',
        status: 'transferred',
      },
    ];
    
    setStudents(mockStudents);
    setFilteredStudents(mockStudents);
  }, []);

  useEffect(() => {
    let results = students;
    
    // Filter by search query
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      results = results.filter(student => 
        student.firstName.toLowerCase().includes(query) || 
        student.lastName.toLowerCase().includes(query)
      );
    }
    
    // Filter by level
    if (levelFilter) {
      results = results.filter(student => student.level === levelFilter);
    }
    
    // Filter by class
    if (classFilter) {
      results = results.filter(student => student.class === classFilter);
    }
    
    // Filter by status
    if (statusFilter !== 'all') {
      results = results.filter(student => student.status === statusFilter);
    }
    
    setFilteredStudents(results);
  }, [searchQuery, levelFilter, classFilter, statusFilter, students]);

  const clearFilters = () => {
    setSearchQuery('');
    setLevelFilter('');
    setClassFilter('');
    setStatusFilter('all');
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavigationMenu />
      
      <div className="p-4 md:p-8">
        <header className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Users className="h-7 w-7" />
              Gestion des Élèves
            </h1>
            <p className="text-muted-foreground">Liste et gestion de tous les élèves</p>
          </div>
          <Button onClick={() => navigate('/students/add')} className="bg-primary">
            <Plus className="mr-2 h-4 w-4" />
            Nouvel Élève
          </Button>
        </header>

        <Separator className="my-6" />
        
        <StudentFilter 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          classFilter={classFilter}
          setClassFilter={setClassFilter}
          levelFilter={levelFilter}
          setLevelFilter={setLevelFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          clearFilters={clearFilters}
        />

        {filteredStudents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredStudents.map((student) => (
              <StudentCard key={student.id} student={student} />
            ))}
          </div>
        ) : (
          <div className="text-center p-8 border border-dashed rounded-md">
            <p className="text-muted-foreground mb-4">
              Aucun élève ne correspond à vos critères de recherche.
            </p>
            <Button onClick={clearFilters} variant="outline">
              Effacer les filtres
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentsList;
