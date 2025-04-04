
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, X } from 'lucide-react';

interface StudentFilterProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  classFilter: string;
  setClassFilter: (classValue: string) => void;
  levelFilter: string;
  setLevelFilter: (level: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  clearFilters: () => void;
}

const StudentFilter: React.FC<StudentFilterProps> = ({
  searchQuery,
  setSearchQuery,
  classFilter,
  setClassFilter,
  levelFilter,
  setLevelFilter,
  statusFilter,
  setStatusFilter,
  clearFilters
}) => {
  const levels = ["CI", "CP", "CE1", "CE2", "CM1", "CM2"];
  const classes = ["A", "B", "C", "D"];
  const statuses = ["all", "active", "inactive", "transferred"];
  
  return (
    <div className="bg-muted/30 p-4 rounded-lg mb-6">
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Rechercher un élève..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        
        <div className="flex flex-wrap gap-3">
          <Select value={levelFilter} onValueChange={setLevelFilter}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Niveau" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Tous</SelectItem>
              {levels.map((level) => (
                <SelectItem key={level} value={level}>{level}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={classFilter} onValueChange={setClassFilter}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Classe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Toutes</SelectItem>
              {classes.map((cls) => (
                <SelectItem key={cls} value={cls}>{cls}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Statut" />
            </SelectTrigger>
            <SelectContent>
              {statuses.map((status) => (
                <SelectItem key={status} value={status}>
                  {status === 'all' ? 'Tous' : 
                   status === 'active' ? 'Actif' : 
                   status === 'inactive' ? 'Inactif' : 'Transféré'}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="icon" onClick={clearFilters} className="h-10 w-10">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StudentFilter;
