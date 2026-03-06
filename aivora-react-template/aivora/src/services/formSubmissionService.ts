export interface FormSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  fileName?: string;
  submittedAt: string;
  status: 'new' | 'read' | 'contacted';
}

const STORAGE_KEY = 'minex_form_submissions';

export const saveFormSubmission = (formData: Omit<FormSubmission, 'id' | 'submittedAt' | 'status'>): FormSubmission => {
  const submissions = getFormSubmissions();
  
  const newSubmission: FormSubmission = {
    id: `submission_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    ...formData,
    submittedAt: new Date().toISOString(),
    status: 'new',
  };

  submissions.unshift(newSubmission); // Add to beginning
  localStorage.setItem(STORAGE_KEY, JSON.stringify(submissions));
  
  return newSubmission;
};

export const getFormSubmissions = (): FormSubmission[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
  
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
};

export const updateSubmissionStatus = (id: string, status: FormSubmission['status']): void => {
  const submissions = getFormSubmissions();
  const index = submissions.findIndex(sub => sub.id === id);
  
  if (index !== -1) {
    submissions[index].status = status;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(submissions));
  }
};

export const deleteSubmission = (id: string): void => {
  const submissions = getFormSubmissions().filter(sub => sub.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(submissions));
};

export const getSubmissionStats = () => {
  const submissions = getFormSubmissions();
  return {
    total: submissions.length,
    new: submissions.filter(s => s.status === 'new').length,
    read: submissions.filter(s => s.status === 'read').length,
    contacted: submissions.filter(s => s.status === 'contacted').length,
  };
};
