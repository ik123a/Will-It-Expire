/**
 * Food Freshness and Shelf Life Calculation Engine
 */

export function calculateFreshness({
  item,
  storage = 'fridge', // 'pantry' | 'fridge' | 'freezer'
  isOpened = false,
  dateType = 'purchase', // 'purchase' | 'opened' | 'expiry'
  selectedDate = new Date().toISOString().split('T')[0], // YYYY-MM-DD
}) {
  const now = new Date();
  const inputDate = new Date(selectedDate);
  // Reset time to start of day for accurate day counting
  inputDate.setHours(0, 0, 0, 0);
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  // Determine standard total shelf life based on chosen storage & opened state
  let totalAllowedDays = 7; // default fallback
  let storageLabel = 'Refrigerator';

  if (storage === 'pantry') {
    storageLabel = 'Pantry';
    totalAllowedDays = isOpened 
      ? item.pantryLife.openedDays 
      : item.pantryLife.unopenedDays;
  } else if (storage === 'freezer') {
    storageLabel = 'Freezer';
    totalAllowedDays = item.freezeLife.days || 90;
  } else {
    // fridge
    storageLabel = 'Refrigerator';
    totalAllowedDays = isOpened 
      ? item.refrigLife.openedDays 
      : item.refrigLife.unopenedDays;
  }

  // Handle case where food should never be stored at this location (e.g. raw meat in pantry)
  if (totalAllowedDays === 0) {
    return {
      status: 'danger',
      statusText: 'Unsafe Storage Method',
      percentage: 0,
      daysElapsed: 0,
      daysRemaining: 0,
      totalAllowedDays: 0,
      advice: `⚠️ ${item.name} should NOT be kept in the ${storageLabel.toLowerCase()}. Store in the ${item.idealStorage} immediately.`,
      color: '#F43F5E',
      badgeClass: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
      isUnsafeStorage: true
    };
  }

  // Calculate days passed since the input date
  const diffTime = today.getTime() - inputDate.getTime();
  const daysElapsed = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const daysRemaining = totalAllowedDays - daysElapsed;

  // Calculate freshness percentage (100% = fresh, 0% = expired)
  let percentage = Math.round((daysRemaining / totalAllowedDays) * 100);
  percentage = Math.max(0, Math.min(100, percentage));

  // Determine status and actionable advice
  let status = 'fresh';
  let statusText = 'Fresh & Peak Quality';
  let color = '#10B981';
  let badgeClass = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
  let advice = `Optimal freshness. Safe to consume in ${storageLabel.toLowerCase()}.`;

  if (daysRemaining < 0) {
    const expiredDaysAgo = Math.abs(daysRemaining);
    status = 'expired';
    statusText = `Likely Expired (${expiredDaysAgo}d past safe window)`;
    color = '#F43F5E';
    badgeClass = 'bg-rose-500/20 text-rose-300 border-rose-500/30';
    
    if (item.safetyRating === 'high_risk') {
      advice = `⚠️ High Risk: ${item.name} is past safe consumption window. Do not taste test; inspect carefully or discard.`;
    } else {
      advice = `Past peak date. For low-risk items, perform the Look, Smell & Touch test before using.`;
    }
  } else if (daysRemaining <= Math.max(2, Math.ceil(totalAllowedDays * 0.2))) {
    status = 'caution';
    statusText = `Consume Soon (${daysRemaining} ${daysRemaining === 1 ? 'day' : 'days'} left)`;
    color = '#F59E0B';
    badgeClass = 'bg-amber-500/20 text-amber-300 border-amber-500/30';
    advice = `Quality will soon decline. Plan to eat within the next ${daysRemaining} days or freeze if possible.`;
  } else if (daysRemaining <= Math.ceil(totalAllowedDays * 0.5)) {
    status = 'good';
    statusText = `Good Condition (${daysRemaining} days left)`;
    color = '#38BDF8';
    badgeClass = 'bg-sky-500/20 text-sky-300 border-sky-500/30';
    advice = `In good standing. Keep container properly sealed.`;
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
