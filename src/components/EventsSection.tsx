import React, { useState } from 'react';
import './EventsSection.css';
import { getInviteType } from '../utils/inviteType';

type Event = {
    id: string;
    date: string;
    emoji: string;
    title: string;
    subtitle?: string;
    description: string | React.ReactNode;
    schedule?: { time: string; label: string }[];
    /** Alternative schedule shown only to 'familiar' invite type */
    scheduleGeneral?: { time: string; label: string }[];
    tag?: string;
    tagColor?: string;
    /** Only show this event for the 'familiar' invite type */
    familiarOnly?: boolean;
};

const allEvents: Event[] = [
    {
        id: 'rompe-hielos',
        date: 'Jueves 05 de Noviembre',
        emoji: '🍷',
        title: 'Rompe Hielos',
        tag: 'Noche previa · Solo familia',
        tagColor: '#8B5CF6',
        familiarOnly: true,
        description: (
            <>
                <p>
                    La noche antes de la boda queremos reunirnos con la familia más cercana para
                    convivir, reír y comenzar a estrechar lazos entre ambas familias antes del gran día.
                </p>
                <p>
                    De <strong>5:00 p.m. a 7:00 p.m.</strong> será un momento íntimo y exclusivo
                    para la familia cercana — un brindis privado tipo cóctel para conocernos,
                    descubrir afinidades y romper el hielo. ¡Agradecemos su puntualidad!
                </p>
                <p>
                    De <strong>7:00 p.m. a 9:00 p.m.</strong> el encuentro se abre para todos
                    los invitados que quieran acompañarnos. El ambiente será relajado con
                    música bohemia en vivo y algunos snacks para picar. No habrá cena como tal
                    — el plan es descansar bien y llegar frescos al día siguiente. ✨
                </p>
            </>
        ),
        schedule: [
            { time: '5:00 pm', label: 'Brindis privado · Solo familia cercana 🤋' },
            { time: '7:00 pm', label: 'Apertura para todos los invitados · Música bohemia en vivo + snacks 🍟' },
            { time: '9:00 pm', label: 'Cierre — ¡a descansar para mañana! 🌙' },
        ],
    },
    {
        id: 'boda',
        date: 'Viernes 06 de Noviembre',
        emoji: '📒',
        title: 'La Boda',
        tag: 'El gran día',
        tagColor: '#DB7093',
        description: (
            <>
                <p>
                    Con mucha ilusión, queremos compartir con ustedes uno de los días más
                    importantes de nuestras vidas.
                </p>
            </>
        ),
        // Familiar invite: includes family photo session + break
        schedule: [
            { time: '1:20 pm', label: 'Sesión de fotografías con familia cercana: abuelos, tíos, nietos y retratos por familia 📸' },
            { time: '2:20 pm', label: 'Receso · Aperitivo ligero, retoques y últimos detalles' },
            { time: '3:30 pm', label: 'Ceremonia 🕊️' },
            { time: '5:15 pm', label: 'Brindis al atardecer en el muelle 🌄' },
            { time: '6:00 pm', label: 'Banquete 🍽️' },
            { time: '7:30 pm', label: 'Vals de novios y padres 🌙' },
            { time: '8:10 pm', label: 'Se abre la pista con DJ 🎶' },
            { time: '11:00 pm', label: 'Cena de desvelados 🌮' },
        ],
        // General invite: starts at the ceremony
        scheduleGeneral: [
            { time: '3:30 pm', label: 'Ceremonia 🕊️' },
            { time: '5:15 pm', label: 'Brindis al atardecer en el muelle 🌄' },
            { time: '6:00 pm', label: 'Banquete 🍽️' },
            { time: '7:30 pm', label: 'Vals de novios y padres 🌙' },
            { time: '8:10 pm', label: 'Se abre la pista con DJ 🎶' },
            { time: '11:00 pm', label: 'Cena de desvelados 🌮' },
        ],
    },
    {
        id: 'tornaboda',
        date: 'Sábado 07 de Noviembre',
        emoji: '🎊',
        title: 'Tornaboda',
        tag: 'Al día siguiente',
        tagColor: '#F59E0B',
        description: (
            <>
                <p>
                    Al día siguiente de la celebración, los invitamos a compartir un momento de
                    descanso y convivencia. Disfrutaremos de un desayuno "quitacrudas", seguido
                    de un día libre para disfrutar del lugar.
                </p>
                <p>
                    Podrán relajarse en la alberca, nadar en la laguna, disfrutar de música,
                    degustar la deliciosa variedad de alimentos y bebidas del restaurante o
                    participar en actividades como{' '}
                    <strong>catamarán, kayak, lanchas de pedal o tablas de surf</strong>.
                </p>
                <p>
                    Un espacio pensado para recargar energía, convivir, compartir los momentos
                    de la noche anterior y cerrar juntos este fin de semana inolvidable.
                </p>
            </>
        ),
    },
];

// ── Sub-components ───────────────────────────────────────────────────────────

const EventCard: React.FC<{ event: Event; isOpen: boolean; onToggle: () => void; inviteType: 'familiar' | 'general' }> = ({
    event,
    isOpen,
    onToggle,
    inviteType,
}) => {
    // Use scheduleGeneral for non-family guests when available
    const schedule = (inviteType === 'general' && event.scheduleGeneral)
        ? event.scheduleGeneral
        : event.schedule;

    return (
    <article className={`event-card ${isOpen ? 'event-card--open' : ''}`} id={`event-${event.id}`}>
        <button className="event-card__header" onClick={onToggle} aria-expanded={isOpen}>
            <div className="event-card__header-left">
                <span className="event-card__emoji">{event.emoji}</span>
                <div>
                    {event.tag && (
                        <span
                            className="event-card__tag"
                            style={{
                                backgroundColor: event.tagColor ? `${event.tagColor}20` : undefined,
                                color: event.tagColor,
                                borderColor: event.tagColor ? `${event.tagColor}40` : undefined,
                            }}
                        >
                            {event.tag}
                        </span>
                    )}
                    <h3 className="event-card__title">{event.title}</h3>
                    <p className="event-card__date">{event.date}</p>
                </div>
            </div>
            <span className="event-card__chevron">{isOpen ? '▲' : '▼'}</span>
        </button>

        <div className="event-card__body" aria-hidden={!isOpen}>
            <div className="event-card__description">{event.description}</div>

            {schedule && (
                <div className="event-timeline">
                    <h4 className="event-timeline__heading">Cronograma</h4>
                    <ol className="event-timeline__list">
                        {schedule.map((item, i) => (
                            <li key={i} className="event-timeline__item">
                                <span className="event-timeline__time">{item.time}</span>
                                <span className="event-timeline__dot" />
                                <span className="event-timeline__label">{item.label}</span>
                            </li>
                        ))}
                    </ol>
                </div>
            )}
        </div>
    </article>
    );
};

// ── Main Section ─────────────────────────────────────────────────────────────

const EventsSection: React.FC = () => {
    const [openId, setOpenId] = useState<string | null>(null);
    const inviteType = getInviteType();

    // Filter: general guests skip familiarOnly events
    const visibleEvents = allEvents.filter(
        (e) => !e.familiarOnly || inviteType === 'familiar'
    );

    const toggle = (id: string) => setOpenId((prev) => (prev === id ? null : id));

    return (
        <section className="events-section" id="eventos">
            <div className="events-container">
                <span className="events-eyebrow">Nuestros momentos</span>
                <h2 className="events-heading">Celebremos juntos cada momento</h2>
                <p className="events-subheading">
                    Hemos preparado momentos especiales para compartir con ustedes
                </p>

                {inviteType === 'familiar' && (
                    <div className="invite-badge invite-badge--familiar">
                        👨‍👩‍👧‍👦 Invitación familiar — incluye Rompe Hielos y sesión fotográfica exclusiva
                    </div>
                )}

                <div className="events-list">
                    {visibleEvents.map((event) => (
                        <EventCard
                            key={event.id}
                            event={event}
                            isOpen={openId === event.id}
                            onToggle={() => toggle(event.id)}
                            inviteType={inviteType}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default EventsSection;
