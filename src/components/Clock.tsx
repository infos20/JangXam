
import React, { useState, useEffect } from 'react';
import { Clock as ClockIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <Card className="bg-card">
      <CardContent className="p-4 flex items-center">
        <ClockIcon className="w-5 h-5 mr-2 text-primary" />
        <div>
          <p className="text-xl font-bold">{formatTime(time)}</p>
          <p className="text-xs text-muted-foreground">{formatDate(time)}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default Clock;
