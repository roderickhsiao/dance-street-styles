'use client';

import { useReducer } from 'react';
import { useActionState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from '@/lib/motion';
import { submitContactForm } from '@/app/actions/contact';
import { Button } from '@/components/ui/button';
import clsx from 'clsx';

// Types
interface ContactFormProps {
  className?: string;
  onCancel?: () => void;
}

type ContactCategory = 'correction' | 'contribution' | 'question' | 'collaboration';
type Step = 1 | 2 | 3;

interface FormState {
  currentStep: Step;
  selectedCategory: ContactCategory | null;
  formData: {
    name: string;
    email: string;
    instagram: string;
    twitter: string;
    website: string;
    subject: string;
    message: string;
    category: ContactCategory | '';
  };
  attachments: File[];
}

// Actions
type FormAction =
  | { type: 'SET_STEP'; payload: Step }
  | { type: 'SET_CATEGORY'; payload: ContactCategory }
  | { type: 'UPDATE_FIELD'; payload: { field: string; value: string } }
  | { type: 'SET_ATTACHMENTS'; payload: File[] }
  | { type: 'RESET_FORM' };

// Reducer
const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case 'SET_STEP':
      return { ...state, currentStep: action.payload };
    case 'SET_CATEGORY':
      return {
        ...state,
        selectedCategory: action.payload,
        formData: { ...state.formData, category: action.payload },
        currentStep: 2
      };
    case 'UPDATE_FIELD':
      return {
        ...state,
        formData: { ...state.formData, [action.payload.field]: action.payload.value }
      };
    case 'SET_ATTACHMENTS':
      return { ...state, attachments: action.payload };
    case 'RESET_FORM':
      return initialState;
    default:
      return state;
  }
};

// Initial state
const initialState: FormState = {
  currentStep: 1,
  selectedCategory: null,
  formData: {
    name: '',
    email: '',
    instagram: '',
    twitter: '',
    website: '',
    subject: '',
    message: '',
    category: '',
  },
  attachments: [],
};

// Step Progress Component
const StepProgress = ({ 
  currentStep, 
  onStepClick, 
  isPending, 
  isSuccess 
}: { 
  currentStep: Step; 
  onStepClick: (step: Step) => void;
  isPending: boolean;
  isSuccess: boolean;
}) => (
  <div className="flex items-center mb-8 p-4 bg-gray-800/50">
    {[1, 2, 3].map((step) => (
      <div key={step} className="flex items-center">
        <button
          type="button"
          onClick={() => step < currentStep && onStepClick(step as Step)}
          disabled={step > currentStep || isPending || isSuccess}
          className={clsx(
            'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200',
            'focus:outline-none focus:ring-2 focus:ring-accent-primary/20',
            step <= currentStep
              ? 'bg-accent-primary text-black'
              : 'bg-surface-secondary text-content-tertiary',
            step < currentStep && !isPending && !isSuccess
              ? 'hover:bg-accent-primary/90 hover:scale-105 cursor-pointer'
              : '',
            step === currentStep ? 'ring-2 ring-accent-primary/30' : '',
            step > currentStep ? 'cursor-not-allowed opacity-60' : ''
          )}
          title={
            step < currentStep && !isPending && !isSuccess
              ? `Go back to step ${step}`
              : step === currentStep
              ? `Current step: ${step}`
              : `Step ${step}`
          }
        >
          {step}
        </button>
        {step < 3 && (
          <div
            className={clsx(
              'w-12 h-0.5 transition-colors',
              step < currentStep ? 'bg-accent-primary' : 'bg-surface-secondary'
            )}
          />
        )}
      </div>
    ))}
  </div>
);

// Form Field Component
const FormField = ({ 
  id, 
  label, 
  type = 'text', 
  value, 
  onChange, 
  placeholder, 
  required = false,
  disabled = false,
  className = '',
  prefix = null
}: {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  prefix?: React.ReactNode;
}) => (
  <div className={className}>
    <label htmlFor={id} className="block text-body-sm font-medium text-white mb-1.5">
      {label} {required && '*'}
    </label>
    <div className="relative">
      {prefix && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-content-tertiary text-body-sm">
          {prefix}
        </span>
      )}
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={clsx(
          'w-full px-4 py-3 rounded-xl bg-gray-700/60 border-2 border-gray-500/60',
          'text-white placeholder-gray-300 text-body-sm',
          'focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/30 focus:outline-none focus:bg-gray-600/70',
          'transition-all duration-300 hover:border-gray-400/80 hover:bg-gray-700/70',
          'backdrop-blur-sm shadow-inner',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          prefix ? 'pl-10' : ''
        )}
        placeholder={placeholder}
      />
    </div>
  </div>
);

// Navigation Buttons Component
const NavigationButtons = ({
  currentStep,
  canContinue,
  onBack,
  onCancel,
  onContinue,
  isPending,
  isSuccess,
  t
}: {
  currentStep: Step;
  canContinue: boolean;
  onBack: () => void;
  onCancel?: () => void;
  onContinue?: () => void;
  isPending: boolean;
  isSuccess: boolean;
  t: (key: string) => string;
}) => (
  <div className="flex justify-between pt-4">
    <div className="flex gap-3">
      {currentStep > 1 && (
        <Button
          type="button"
          onClick={onBack}
          variant="secondary"
          className="px-6 py-2 text-body-sm border-2 border-stroke-primary bg-surface-secondary text-content-primary hover:bg-surface-elevated hover:border-accent-primary"
        >
          {isSuccess ? t('navigation.startOver') : t('navigation.back')}
        </Button>
      )}
      {onCancel && !isSuccess && (
        <Button
          type="button"
          onClick={onCancel}
          variant="outline"
          className="px-6 py-2 text-body-sm border-2 border-stroke-secondary bg-transparent text-content-secondary hover:bg-surface-primary hover:border-accent-primary hover:text-content-primary"
        >
          {t('navigation.cancel')}
        </Button>
      )}
    </div>
    
    {currentStep < 3 && (
      <Button
        type="button"
        onClick={onContinue}
        disabled={!canContinue}
        className="px-6 py-2 text-body-sm bg-accent-primary text-black hover:bg-accent-primary/90"
      >
        {t('navigation.continue')}
      </Button>
    )}
    
    {currentStep === 3 && (
      <Button
        type="submit"
        disabled={isPending || isSuccess || !canContinue}
        className={clsx(
          'px-6 py-2 bg-accent-primary text-black font-semibold rounded-lg',
          'transition-all duration-200 hover:bg-accent-primary/90',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'flex items-center gap-2 text-body-sm'
        )}
      >
        {isPending ? (
          <>
            <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
            {t('buttons.sending')}
          </>
        ) : isSuccess ? (
          <>
            <span>✓</span>
            {t('buttons.sent')}
          </>
        ) : (
          t('buttons.send')
        )}
      </Button>
    )}
  </div>
);

// Main Component
export function ContactForm({ className, onCancel }: ContactFormProps) {
  const t = useTranslations('contact.form');
  const [state, dispatch] = useReducer(formReducer, initialState);
  const [submitState, formAction, isPending] = useActionState(
    submitContactForm,
    { success: false }
  );

  const categories = [
    {
      id: 'correction' as ContactCategory,
      icon: '📝',
      title: t('categories.correction.title'),
      description: t('categories.correction.description')
    },
    {
      id: 'contribution' as ContactCategory,
      icon: '🎵',
      title: t('categories.contribution.title'),
      description: t('categories.contribution.description')
    },
    {
      id: 'question' as ContactCategory,
      icon: '💬',
      title: t('categories.question.title'),
      description: t('categories.question.description')
    },
    {
      id: 'collaboration' as ContactCategory,
      icon: '🤝',
      title: t('categories.collaboration.title'),
      description: t('categories.collaboration.description')
    }
  ];

  const handleFieldChange = (field: string, value: string) => {
    dispatch({ type: 'UPDATE_FIELD', payload: { field, value } });
  };

  const handleStepNavigation = (step: Step) => {
    if (step < state.currentStep) {
      dispatch({ type: 'SET_STEP', payload: step });
    } else if (step === state.currentStep + 1) {
      // Validate current step before proceeding
      if (step === 2 && state.selectedCategory) {
        dispatch({ type: 'SET_STEP', payload: step });
      } else if (step === 3 && state.formData.name && state.formData.email) {
        dispatch({ type: 'SET_STEP', payload: step });
      }
    }
  };

  // File upload handlers
  const handleFileUpload = (files: FileList | null) => {
    if (!files) return;
    
    const newFiles = Array.from(files).filter(file => {
      const isValidType = file.type.startsWith('image/') || 
                          file.type === 'application/pdf' ||
                          file.type === 'text/plain' ||
                          file.type === 'application/msword' ||
                          file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB max
      return isValidType && isValidSize;
    });
    
    const updatedFiles = [...state.attachments, ...newFiles].slice(0, 5); // Max 5 files
    dispatch({ type: 'SET_ATTACHMENTS', payload: updatedFiles });
  };

  const removeAttachment = (index: number) => {
    const updatedFiles = state.attachments.filter((_, i) => i !== index);
    dispatch({ type: 'SET_ATTACHMENTS', payload: updatedFiles });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleSubmit = async (formDataObj: FormData) => {
    // Add form data
    Object.entries(state.formData).forEach(([key, value]) => {
      if (value) formDataObj.set(key, value);
    });
    
    // Add attachments
    state.attachments.forEach((file, index) => {
      formDataObj.append(`attachment_${index}`, file);
    });
    formDataObj.set('attachmentCount', state.attachments.length.toString());
    
    return formAction(formDataObj);
  };

  const canContinueFromStep = (): boolean => {
    switch (state.currentStep) {
      case 1:
        return state.selectedCategory !== null;
      case 2:
        return !!(state.formData.name && state.formData.email);
      case 3:
        return !!(state.formData.subject && state.formData.message);
      default:
        return false;
    }
  };

  return (
    <motion.div
      className={clsx(
        'w-full max-w-2xl',
        // Strong contrast glass container design
        'bg-gradient-to-br from-gray-800/90 via-gray-900/95 to-black/90',
        'backdrop-blur-xl border-2 border-gray-600/40 rounded-2xl',
        'p-6 shadow-2xl shadow-black/40',
        // Strong inner glow for contrast
        'ring-2 ring-gray-500/20',
        // Add a subtle background pattern
        'relative',
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Background pattern for extra contrast */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/5 via-transparent to-accent-secondary/5 rounded-2xl" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03),transparent_70%)] rounded-2xl" />
      
      <div className="relative z-10">
        <StepProgress 
        currentStep={state.currentStep}
        onStepClick={(step) => handleStepNavigation(step)}
        isPending={isPending}
        isSuccess={submitState?.success || false}
      />

      <form action={handleSubmit} className="space-y-6">
        <AnimatePresence mode="wait">
          {/* Step 1: Category Selection */}
          {state.currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-header-sm font-semibold text-white mb-4">
                {t('steps.category.title')}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => dispatch({ type: 'SET_CATEGORY', payload: category.id })}
                    className={clsx(
                      'p-6 rounded-xl border-2 text-start transition-all duration-300',
                      'hover:border-accent-primary hover:bg-accent-primary/10 hover:scale-[1.02] hover:shadow-lg hover:shadow-accent-primary/10',
                      'focus:outline-none focus:ring-2 focus:ring-accent-primary/30',
                      'group relative overflow-hidden',
                      state.selectedCategory === category.id
                        ? 'border-accent-primary bg-accent-primary/15 shadow-lg shadow-accent-primary/30 scale-[1.02]'
                        : 'border-gray-500/60 bg-gray-800/60 hover:border-accent-primary/80 hover:bg-gray-700/70'
                    )}
                  >
                    {/* Subtle background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative">
                      <div className="text-3xl mb-3 transform group-hover:scale-110 transition-transform duration-300">{category.icon}</div>
                      <h4 className="font-bold text-white mb-2 text-body-md group-hover:text-accent-primary transition-colors">
                        {category.title}
                      </h4>
                      <p className="text-gray-200 text-body-sm leading-relaxed group-hover:text-white transition-colors">
                        {category.description}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
              
              <div className="flex justify-end pt-4">
                <p className="text-content-tertiary text-body-xs">
                  {t('steps.category.guidance')}
                </p>
              </div>
            </motion.div>
          )}

          {/* Step 2: Personal Information */}
          {state.currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <h3 className="text-header-sm font-semibold text-white mb-4">
                {t('steps.personal.title')}
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  id="name"
                  label={t('fields.name.label')}
                  value={state.formData.name}
                  onChange={(value) => handleFieldChange('name', value)}
                  placeholder={t('fields.name.placeholder')}
                  required
                  disabled={isPending || submitState?.success}
                />
                <FormField
                  id="email"
                  label={t('fields.email.label')}
                  type="email"
                  value={state.formData.email}
                  onChange={(value) => handleFieldChange('email', value)}
                  placeholder={t('fields.email.placeholder')}
                  required
                  disabled={isPending || submitState?.success}
                />
              </div>

              <div className="space-y-3">
                <h4 className="text-body-sm font-medium text-white">
                  {t('fields.social.title')} <span className="text-gray-300 font-normal">{t('fields.social.optional')}</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <FormField
                    id="instagram"
                    label={t('fields.social.instagram.label')}
                    value={state.formData.instagram}
                    onChange={(value) => handleFieldChange('instagram', value)}
                    placeholder={t('fields.social.instagram.placeholder')}
                    disabled={isPending || submitState?.success}
                    prefix="@"
                  />
                  <FormField
                    id="twitter"
                    label={t('fields.social.twitter.label')}
                    value={state.formData.twitter}
                    onChange={(value) => handleFieldChange('twitter', value)}
                    placeholder={t('fields.social.twitter.placeholder')}
                    disabled={isPending || submitState?.success}
                    prefix="@"
                  />
                  <FormField
                    id="website"
                    label={t('fields.social.website.label')}
                    type="url"
                    value={state.formData.website}
                    onChange={(value) => handleFieldChange('website', value)}
                    placeholder={t('fields.social.website.placeholder')}
                    disabled={isPending || submitState?.success}
                  />
                </div>
              </div>

              <NavigationButtons
                currentStep={state.currentStep}
                canContinue={canContinueFromStep()}
                onBack={() => handleStepNavigation((state.currentStep - 1) as Step)}
                onCancel={onCancel}
                onContinue={() => handleStepNavigation((state.currentStep + 1) as Step)}
                isPending={isPending}
                isSuccess={submitState?.success || false}
                t={t}
              />
            </motion.div>
          )}

          {/* Step 3: Message & Attachments */}
          {state.currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <h3 className="text-header-sm font-semibold text-white mb-4">
                {t('steps.message.title')}
              </h3>

              <FormField
                id="subject"
                label={t('fields.subject.label')}
                value={state.formData.subject}
                onChange={(value) => handleFieldChange('subject', value)}
                placeholder={t('fields.subject.placeholder')}
                required
                disabled={isPending || submitState?.success}
              />

              <div>
                <label htmlFor="message" className="block text-body-sm font-medium text-white mb-1.5">
                  {t('fields.message.label')} *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={state.formData.message}
                  onChange={(e) => handleFieldChange('message', e.target.value)}
                  disabled={isPending || submitState?.success}
                  className={clsx(
                    'w-full px-4 py-3 rounded-xl bg-gray-700/60 border-2 border-gray-500/60 resize-y',
                    'text-white placeholder-gray-300 text-body-sm',
                    'focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/30 focus:outline-none focus:bg-gray-600/70',
                    'transition-all duration-300 hover:border-gray-400/80 hover:bg-gray-700/70',
                    'backdrop-blur-sm shadow-inner',
                    'disabled:opacity-50 disabled:cursor-not-allowed'
                  )}
                  placeholder={t('fields.message.placeholder')}
                />
              </div>

              {/* File Attachments */}
              <div>
                <label className="block text-body-sm font-medium text-white mb-1.5">
                  {t('attachments.title')} <span className="text-gray-300 font-normal">{t('attachments.optional')}</span>
                </label>
                <div
                  className={clsx(
                    'border-2 border-dashed border-accent-primary/30 rounded-xl p-8 text-center transition-all duration-300',
                    'bg-gradient-to-br from-accent-primary/5 via-transparent to-accent-secondary/5',
                    'hover:border-accent-primary hover:bg-accent-primary/10 hover:shadow-lg hover:shadow-accent-primary/10',
                    'backdrop-blur-sm group',
                    isPending || submitState?.success ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:scale-[1.01]'
                  )}
                  onDrop={(e) => {
                    e.preventDefault();
                    if (!isPending && !submitState?.success) {
                      handleFileUpload(e.dataTransfer.files);
                    }
                  }}
                  onDragOver={(e) => e.preventDefault()}
                  onClick={() => {
                    if (!isPending && !submitState?.success) {
                      document.getElementById('file-upload')?.click();
                    }
                  }}
                >
                  <input
                    id="file-upload"
                    type="file"
                    multiple
                    accept="image/*,.pdf,.txt,.doc,.docx"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e.target.files)}
                    disabled={isPending || submitState?.success}
                  />
                  <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform duration-300 text-accent-primary">
                    📎
                  </div>
                  <p className="text-body-md font-medium text-white mb-2 group-hover:text-accent-primary transition-colors">
                    {t('attachments.dropzone.title')}
                  </p>
                  <p className="text-body-xs text-content-tertiary">
                    {t('attachments.dropzone.subtitle')}
                  </p>
                </div>

                {/* Attachment Preview */}
                {state.attachments.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {state.attachments.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-surface-secondary/70 rounded-xl border border-stroke-secondary/40 hover:bg-surface-elevated/50 hover:border-accent-primary/30 transition-all duration-200 backdrop-blur-sm"
                      >
                        <div className="flex items-center space-x-2">
                          <span className="text-accent-primary">
                            {file.type.startsWith('image/') ? '🖼️' : file.type === 'application/pdf' ? '📄' : '📋'}
                          </span>
                          <div>
                            <p className="text-body-xs font-medium text-white truncate max-w-[200px]">
                              {file.name}
                            </p>
                            <p className="text-body-xs text-content-tertiary">
                              {formatFileSize(file.size)}
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeAttachment(index)}
                          disabled={isPending || submitState?.success}
                          className="text-content-tertiary hover:text-red-400 transition-colors disabled:opacity-50"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Success/Error Messages */}
              {submitState?.error && (
                <motion.div 
                  className="p-4 bg-red-500/15 border border-red-500/30 rounded-xl backdrop-blur-sm shadow-lg"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <p className="text-red-400 text-body-sm font-medium">{submitState.error}</p>
                </motion.div>
              )}

              {submitState?.success && (
                <motion.div 
                  className="p-6 bg-gradient-to-r from-green-500/15 to-emerald-500/15 border border-green-500/30 rounded-xl backdrop-blur-sm shadow-lg shadow-green-500/10"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-green-400 text-body-sm font-medium mb-2">
                    {t('messages.success.title')}
                  </p>
                  <p className="text-green-300 text-body-xs">
                    {t('messages.success.subtitle')}
                  </p>
                </motion.div>
              )}

              <NavigationButtons
                currentStep={state.currentStep}
                canContinue={canContinueFromStep()}
                onBack={() => submitState?.success ? dispatch({ type: 'RESET_FORM' }) : handleStepNavigation((state.currentStep - 1) as Step)}
                onCancel={onCancel}
                isPending={isPending}
                isSuccess={submitState?.success || false}
                t={t}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </form>
      </div>
    </motion.div>
  );
}