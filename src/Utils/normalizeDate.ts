export function normalizeDate(dateStr: string): string {
  let description: string = '';

  const dateTrack = new Date(dateStr);
  const dateNow = new Date();

  const diffDate = dateNow.getTime() - dateTrack.getTime()

  const days = Math.floor(diffDate / (1000 * 60 * 60 * 24));

  let digit: number = days;

  if (digit < 5) {
    if (String(digit).endsWith('1')) {
      description = ' день';
    } else {
      description = ' дня';
    }
  } else {
    description = ' дней';
  }

  if (days >= 7) {
    digit = Math.floor(days / 7)

    if (digit === 1) {
      description = ' неделя';
    } else {
      description = ' недели';
    }
  }

  if (days >= 30) {
    digit = Math.floor(days / 30);

    if (digit < 5) {
      if (digit === 1) {
        description = ' месяц';
      } else{
        description = ' месяца';
      }
    } else {
      description = ' месяцев';
    }
  }

  if (days >= 365) {
    digit = Math.floor(days / 365);

    if (digit < 5) {
      if (digit === 1) {
        description = ' год';
      } else {
        description = ' года';
      }
    } else {
      description = ' лет';
    }
  }

  return digit + description;
}