import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCheck, Bell } from 'lucide-react';
import { useHomeStore } from '../../store/useHomeStore';

const TYPE_COLORS: Record<string, string> = {
  warning: '#FFD700',
  info: '#00BCD4',
  success: '#00FF88',
  danger: '#FF4500',
};

const TYPE_ICONS: Record<string, string> = {
  warning: '⚠️',
  info: 'ℹ️',
  success: '✅',
  danger: '🚨',
};

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const min = Math.floor(diff / 60000);
  if (min < 1) return 'Just now';
  if (min < 60) return `${min}m ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h ago`;
  return `${Math.floor(hr / 24)}d ago`;
}

export function NotificationsPanel() {
  const {
    isNotificationsOpen,
    toggleNotifications,
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
  } = useHomeStore();

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <AnimatePresence>
      {isNotificationsOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleNotifications();
            }}
            className="fixed inset-0 cursor-pointer"
            style={{ zIndex: 55, pointerEvents: 'auto', background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(2px)' }}
          />

          {/* Panel */}
          <motion.div
            initial={{ y: -20, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -20, opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="fixed top-[68px] right-14 overflow-hidden rounded-2xl"
            style={{
              width: '340px',
              maxHeight: '500px',
              background: 'linear-gradient(180deg, #0D0D20 0%, #0A0A1A 100%)',
              border: '1px solid #2A2A4A',
              boxShadow: '0 20px 60px rgba(0,0,0,0.8)',
              zIndex: 60,
              pointerEvents: 'auto',
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3"
              style={{ borderBottom: '1px solid #1E1E3A' }}>
              <div className="flex items-center gap-2">
                <Bell size={16} style={{ color: '#00BCD4' }} />
                <span className="text-white font-bold">Notifications</span>
                {unreadCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold"
                    style={{ background: '#E94560', color: '#FFF' }}>
                    {unreadCount}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      markAllNotificationsRead();
                    }}
                    className="flex items-center gap-1 text-xs px-2 py-1 rounded-lg transition-all hover:scale-105 cursor-pointer"
                    style={{ color: '#00BCD4', background: '#001520', border: '1px solid #00BCD4', cursor: 'pointer' }}
                  >
                    <CheckCheck size={12} />
                    All read
                  </button>
                )}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleNotifications();
                  }}
                  className="w-7 h-7 rounded-lg flex items-center justify-center cursor-pointer"
                  style={{ background: '#1A1A35', cursor: 'pointer' }}
                >
                  <X size={12} style={{ color: '#AAAACC' }} />
                </motion.button>
              </div>
            </div>

            {/* Notifications list */}
            <div className="overflow-y-auto" style={{ maxHeight: '420px' }}>
              {notifications.length === 0 && (
                <div className="text-center py-12" style={{ color: '#555577' }}>
                  <Bell size={32} className="mx-auto mb-2 opacity-30" />
                  <div className="text-sm">No notifications</div>
                </div>
              )}
              {notifications.map((notif, i) => (
                <motion.div
                  key={notif.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    markNotificationRead(notif.id);
                  }}
                  className="px-4 py-3 cursor-pointer transition-all hover:brightness-110"
                  style={{
                    borderBottom: '1px solid #1A1A30',
                    background: notif.isRead ? 'transparent' : '#0A0A20',
                    borderLeft: `3px solid ${notif.isRead ? 'transparent' : TYPE_COLORS[notif.type]}`,
                  }}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-base mt-0.5 flex-shrink-0">{TYPE_ICONS[notif.type]}</span>
                    <div className="flex-1 min-w-0">
                      <div
                        className="text-sm leading-tight"
                        style={{ color: notif.isRead ? '#888899' : '#FFFFFF' }}
                      >
                        {notif.message}
                      </div>
                      <div className="text-xs mt-1" style={{ color: '#444466' }}>
                        {timeAgo(notif.createdAt)}
                      </div>
                    </div>
                    {!notif.isRead && (
                      <div className="w-2 h-2 rounded-full flex-shrink-0 mt-1"
                        style={{ background: TYPE_COLORS[notif.type] }} />
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
