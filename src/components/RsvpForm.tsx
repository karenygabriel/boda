import React, { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import './RsvpForm.css';

const SCRIPT_URL =
    'https://script.google.com/macros/s/AKfycbzaveDlFtSVMgozkOTCnZUw0W4jD0rqNxs-2kQ8hLJBdXeQhpib2IRgyJ56C87Yoa5f5A/exec';

type Option = {
    value: string;
    label: string;
    description?: string;
    emoji: string;
};

const starters: Option[] = [
    { value: 'tostada_aguachile', label: 'Tostada Aguachile', description: 'Camarón fresco marinado', emoji: '🌊' },
    { value: 'tostada_ceviche', label: 'Tostada Ceviche', description: 'Mezcla de mariscos con limón', emoji: '🍋' },
];

const mainCourses: Option[] = [
    { value: 'camarones_pasta', label: 'Camarones Gratinados con Pasta', description: 'Camarones al ajillo con pasta artesanal', emoji: '🍝' },
    { value: 'arroz_chicharron', label: 'Chicharron de pescado', description: 'Arroz tradicional con chicharrón crujiente', emoji: '🍚' },
];

const lateNightSnacks: Option[] = [
    { value: 'chilaquiles', label: 'Chilaquiles', description: 'Tortilla en salsa roja o verde', emoji: '🫔' },
    { value: 'birria', label: 'Birria', description: 'Guiso tradicional de res con consomé', emoji: '🍲' },
];

const STEP_LABELS = ['Nombre', 'Entrante', 'Principal', 'Desayuno', 'Confirmar'];
const TOTAL_STEPS = 5;

// ── Sub-components ──────────────────────────────────────────────────────────

type CardGridProps = {
    options: Option[];
    selectedValue: string;
    onSelect: (v: string) => void;
};

const CardGrid: React.FC<CardGridProps> = ({ options, selectedValue, onSelect }) => (
    <div className="meal-card-container">
        {options.map((opt) => {
            const isActive = selectedValue === opt.value;
            return (
                <div
                    key={opt.value}
                    className={`meal-card ${isActive ? 'active' : ''}`}
                    onClick={() => onSelect(opt.value)}
                    role="button"
                    aria-pressed={isActive}
                >
                    <span className="meal-card-emoji">{opt.emoji}</span>
                    <span className="meal-card-title">{opt.label}</span>
                    {opt.description && <span className="meal-card-desc">{opt.description}</span>}
                    <div className="meal-card-check">✓</div>
                </div>
            );
        })}
    </div>
);

type StepNavProps = {
    onNext: () => void;
    onBack?: () => void;
    nextLabel?: string;
    nextDisabled?: boolean;
    isPending?: boolean;
};

const StepNav: React.FC<StepNavProps> = ({
    onNext,
    onBack,
    nextLabel = 'Siguiente →',
    nextDisabled = false,
    isPending = false,
}) => (
    <div className="step-nav">
        {onBack && (
            <button type="button" className="btn-back" onClick={onBack}>
                ← Atrás
            </button>
        )}
        <button
            type="button"
            className="btn-next"
            onClick={onNext}
            disabled={nextDisabled || isPending}
        >
            {isPending ? (
                <span className="btn-spinner">
                    <span className="spinner" /> Enviando…
                </span>
            ) : (
                nextLabel
            )}
        </button>
    </div>
);

// ── Progress Bar ─────────────────────────────────────────────────────────────

const ProgressBar: React.FC<{ step: number }> = ({ step }) => {
    const pct = ((step - 1) / (TOTAL_STEPS - 1)) * 100;
    return (
        <div className="progress-wrapper">
            <div className="progress-bar-track">
                <div className="progress-bar-fill" style={{ width: `${pct}%` }} />
                {STEP_LABELS.map((label, i) => (
                    <div
                        key={label}
                        className={`progress-dot ${i + 1 <= step ? 'done' : ''} ${i + 1 === step ? 'current' : ''}`}
                        style={{ left: `${(i / (TOTAL_STEPS - 1)) * 100}%` }}
                    >
                        <span className="progress-dot-index">{i + 1 <= step - 1 ? '✓' : i + 1}</span>
                        <span className="progress-dot-label">{label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

// ── Success Screen ───────────────────────────────────────────────────────────

const SuccessScreen: React.FC = () => (
    <div className="success-screen">
        <div className="success-confetti">🎊</div>
        <h2 className="rsvp-title success-title">¡Hasta pronto!</h2>
        <p className="success-subtitle">Tu asistencia ha sido confirmada. Nos vemos en el gran día. 🥂</p>

        <div className="tips-card">
            <h3 className="tips-heading">Tips para el evento</h3>
            <ul className="tips-list">
                <li className="tips-item">
                    <span className="tip-icon">🚗</span>
                    <div>
                        <strong>Estacionamiento</strong>
                        <p>Hay valet parking disponible en la entrada principal. Llega con 15 min de anticipación.</p>
                    </div>
                </li>
                <li className="tips-item">
                    <span className="tip-icon">🧥</span>
                    <div>
                        <strong>Clima</strong>
                        <p>El lugar puede refrescar por la noche — te recomendamos traer una capa ligera.</p>
                    </div>
                </li>
                <li className="tips-item">
                    <span className="tip-icon">👗</span>
                    <div>
                        <strong>Código de vestimenta</strong>
                        <p>Formal. Les pedimos respetar el código de color de la novia.</p>
                    </div>
                </li>
                <li className="tips-item">
                    <span className="tip-icon">📸</span>
                    <div>
                        <strong>Fotografías</strong>
                        <p>Por favor guarden sus teléfonos durante la ceremonia. ¡Habrá fotógrafo profesional!</p>
                    </div>
                </li>
                <li className="tips-item">
                    <span className="tip-icon">⏰</span>
                    <div>
                        <strong>Horario</strong>
                        <p>La ceremonia comienza puntualmente. Te esperamos 30 minutos antes.</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
);

// ── Main Form Component ──────────────────────────────────────────────────────

type FormData = {
    name: string;
    starter: string;
    mainCourse: string;
    lateNightSnack: string;
};

const RsvpForm: React.FC = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState<FormData>({
        name: '',
        starter: '',
        mainCourse: '',
        lateNightSnack: '',
    });
    const [tempSelection, setTempSelection] = useState('');

    // Sync temp selection when revisiting a step
    useEffect(() => {
        if (step === 2) setTempSelection(formData.starter);
        if (step === 3) setTempSelection(formData.mainCourse);
        if (step === 4) setTempSelection(formData.lateNightSnack);
    }, [step]); // eslint-disable-line react-hooks/exhaustive-deps

    const next = (field?: keyof FormData) => {
        if (field) setFormData((prev) => ({ ...prev, [field]: tempSelection }));
        setStep((s) => s + 1);
    };

    const back = () => setStep((s) => s - 1);

    // React Query mutation
    const mutation = useMutation({
        mutationFn: async (data: FormData) => {
            const payload = {
                name: data.name,
                attending: 'Sí',
                food1: data.starter,
                food2: data.mainCourse,
                food3: data.lateNightSnack,
            };
            const res = await fetch(SCRIPT_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'text/plain' },
                body: JSON.stringify(payload),
            });
            if (!res.ok) throw new Error('Network error');
            return res.json();
        },
        onSuccess: () => setStep(6),
    });

    const handleConfirm = () => mutation.mutate(formData);

    const isSuccess = step === 6;

    return (
        <section className="rsvp-section">
            <div className={`rsvp-container ${isSuccess ? 'rsvp-container--success' : ''}`}>
                {isSuccess ? (
                    <SuccessScreen />
                ) : (
                    <>
                        <h2 className="rsvp-title">Confirmar Asistencia</h2>
                        <ProgressBar step={step} />

                        {mutation.isError && (
                            <p className="form-error">
                                Hubo un problema al enviar tu confirmación. Por favor intenta de nuevo.
                            </p>
                        )}

                        <form onSubmit={(e) => e.preventDefault()} className="rsvp-form">

                            {/* ── STEP 1: Name ── */}
                            {step === 1 && (
                                <div className="form-step">
                                    <div className="food-intro-banner">
                                        <span className="food-intro-icon">🍽️</span>
                                        <p className="food-intro-text">
                                            Para una mejor experiencia nos gustaría nos especificaras los platillos de tu preferencia y de cada integrante de tu familia, cuidamos cada detalle con amor.
                                        </p>
                                    </div>
                                    <p className="step-prompt">¿Cómo te llamas?</p>
                                    <div className="form-group">
                                        <label htmlFor="name">Nombre Completo</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={(e) =>
                                                setFormData((prev) => ({ ...prev, name: e.target.value }))
                                            }
                                            autoFocus
                                            required
                                            placeholder="Tu nombre completo"
                                        />
                                    </div>
                                    <StepNav onNext={() => next()} nextDisabled={!formData.name.trim()} />
                                </div>
                            )}

                            {/* ── STEP 2: Starter ── */}
                            {step === 2 && (
                                <div className="form-step">
                                    <p className="step-prompt">¿Qué entrante prefieres?</p>
                                    <CardGrid
                                        options={starters}
                                        selectedValue={tempSelection}
                                        onSelect={setTempSelection}
                                    />
                                    <StepNav
                                        onNext={() => next('starter')}
                                        onBack={back}
                                        nextDisabled={!tempSelection}
                                    />
                                </div>
                            )}

                            {/* ── STEP 3: Main Course ── */}
                            {step === 3 && (
                                <div className="form-step">
                                    <p className="step-prompt">¿Cuál será tu plato principal?</p>
                                    <CardGrid
                                        options={mainCourses}
                                        selectedValue={tempSelection}
                                        onSelect={setTempSelection}
                                    />
                                    <StepNav
                                        onNext={() => next('mainCourse')}
                                        onBack={back}
                                        nextDisabled={!tempSelection}
                                    />
                                </div>
                            )}

                            {/* ── STEP 4: Late Night (Desayuno de Desvelados) ── */}
                            {step === 4 && (
                                <div className="form-step">
                                    <p className="step-prompt">Desayuno de desvelados 🌙</p>
                                    <p className="step-subprompt">¿Qué quieres comer cuando el sol salga?</p>
                                    <CardGrid
                                        options={lateNightSnacks}
                                        selectedValue={tempSelection}
                                        onSelect={setTempSelection}
                                    />
                                    <StepNav
                                        onNext={() => next('lateNightSnack')}
                                        onBack={back}
                                        nextDisabled={!tempSelection}
                                    />
                                </div>
                            )}

                            {/* ── STEP 5: Review & Confirm ── */}
                            {step === 5 && (
                                <div className="form-step">
                                    <p className="step-prompt">Revisa tu selección</p>
                                    <ul className="review-list">
                                        <li>
                                            <span className="review-label">Nombre</span>
                                            <span className="review-value">{formData.name}</span>
                                        </li>
                                        <li>
                                            <span className="review-label">Entrante</span>
                                            <span className="review-value">
                                                {starters.find((o) => o.value === formData.starter)?.label ?? '—'}
                                            </span>
                                        </li>
                                        <li>
                                            <span className="review-label">Plato principal</span>
                                            <span className="review-value">
                                                {mainCourses.find((o) => o.value === formData.mainCourse)?.label ?? '—'}
                                            </span>
                                        </li>
                                        <li>
                                            <span className="review-label">Desayuno</span>
                                            <span className="review-value">
                                                {lateNightSnacks.find((o) => o.value === formData.lateNightSnack)?.label ?? '—'}
                                            </span>
                                        </li>
                                    </ul>
                                    <StepNav
                                        onNext={handleConfirm}
                                        onBack={back}
                                        nextLabel="Confirmar y Enviar ✓"
                                        isPending={mutation.isPending}
                                    />
                                </div>
                            )}

                        </form>
                    </>
                )}
            </div>
        </section>
    );
};

export default RsvpForm;
