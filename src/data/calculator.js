/**
 * Calendar-based storage-duration estimates, not food-safety assessments.
 */

export function localDateString(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

export function calculateFreshness({
  item,
  storage = 'fridge', // 'pantry' | 'fridge' | 'freezer'
  isOpened = false,
  dateType = 'purchase', // 'purchase' | 'opened' | 'expiry'
  selectedDate = localDateString(), // local YYYY-MM-DD
}) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const unknown = (reason) => ({
    status: 'unknown', statusText: 'Estimate unavailable',
    percentage: null, daysElapsed: null, daysRemaining: null,
    totalAllowedDays: null, expiryDate: null,
    advice: `${reason} A date estimate cannot determine food safety.`,
    color: '#94A3B8', badgeClass: 'bg-slate-500/20 text-slate-300 border-slate-500/30',
    isUnsafeStorage: false,
  });
  if (typeof selectedDate !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(selectedDate)) {
    return unknown('Enter a valid purchase or opening date.');
  }
  const [year, month, day] = selectedDate.split('-').map(Number);
  const inputDate = new Date(0);
  inputDate.setFullYear(year, month - 1, day);
  inputDate.setHours(0, 0, 0, 0);
  if (year < 1 || inputDate.getFullYear() !== year || inputDate.getMonth() !== month - 1
      || inputDate.getDate() !== day || inputDate > today) {
    return unknown('Enter a real calendar date that is today or earlier.');
  }

  // Determine standard total shelf life based on chosen storage & opened state
  let totalAllowedDays = 7; // default fallback
  let storageLabel = 'Refrigerator';

  if (storage === 'pantry') {
    storageLabel = 'Pantry';
    totalAllowedDays = isOpened
      ? item?.pantryLife?.openedDays
      : item?.pantryLife?.unopenedDays;
  } else if (storage === 'freezer') {
    storageLabel = 'Freezer';
    totalAllowedDays = item?.freezeLife?.days;
  } else if (storage === 'fridge') {
    // fridge
    storageLabel = 'Refrigerator';
    totalAllowedDays = isOpened 
      ? item?.refrigLife?.openedDays
      : item?.refrigLife?.unopenedDays;
  } else {
    return unknown('Choose a listed storage location.');
  }

  if (!Number.isFinite(totalAllowedDays) || totalAllowedDays <= 0) {
    return unknown('No duration estimate is available for this item and storage choice.');
  }

  // Calculate days passed since the input date
  // Compare calendar dates: local midnights can be 23 or 25 hours apart at DST.
  const diffTime = Date.parse(`${localDateString(today)}T00:00:00Z`)
    - Date.parse(`${selectedDate}T00:00:00Z`);
  const daysElapsed = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const daysRemaining = totalAllowedDays - daysElapsed;

  // Fraction of the estimated storage duration remaining, not measured freshness.
  let percentage = Math.round((daysRemaining / totalAllowedDays) * 100);
  percentage = Math.max(0, Math.min(100, percentage));

  // Label the date estimate without assessing the condition of the food.
  let status = 'fresh';
  let statusText = 'Within Estimated Window';
  let color = '#10B981';
  let badgeClass = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
  const advice = 'Based only on the selected date and bundled storage duration. A date estimate cannot determine food safety.';

  if (daysRemaining < 0) {
    const expiredDaysAgo = Math.abs(daysRemaining);
    status = 'expired';
    statusText = `${expiredDaysAgo}d Past Estimated Window`;
    color = '#F43F5E';
    badgeClass = 'bg-rose-500/20 text-rose-300 border-rose-500/30';
    
  } else if (daysRemaining <= Math.max(2, Math.ceil(totalAllowedDays * 0.2))) {
    status = 'caution';
    statusText = `Estimated Window Ends Soon (${daysRemaining}d)`;
    color = '#F59E0B';
    badgeClass = 'bg-amber-500/20 text-amber-300 border-amber-500/30';
  } else if (daysRemaining <= Math.ceil(totalAllowedDays * 0.5)) {
    status = 'good';
    statusText = `${daysRemaining}d in Estimated Window`;
    color = '#38BDF8';
    badgeClass = 'bg-sky-500/20 text-sky-300 border-sky-500/30';
  }

  // Formatting date calculations
  const expiryDate = new Date(inputDate);
  expiryDate.setDate(expiryDate.getDate() + totalAllowedDays);
  const formattedExpiryDate = expiryDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return {
    status,
    statusText,
    percentage,
    daysElapsed,
    daysRemaining,
    totalAllowedDays,
    expiryDate: formattedExpiryDate,
    advice,
    color,
    badgeClass,
    isUnsafeStorage: false,
    storageLabel,
    isOpened
  };
}
