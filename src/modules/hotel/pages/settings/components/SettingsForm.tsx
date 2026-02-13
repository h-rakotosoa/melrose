import { useState } from 'react';
import { Button, TextField } from '@app/contracts/ui.contract';
import { HotelSettings } from '../../../types/settings.types';

interface SettingsFormProps {
  settings: HotelSettings;
  onSave: (settings: HotelSettings) => Promise<void>;
  isSaving: boolean;
}

export const SettingsForm = ({ settings, onSave, isSaving }: SettingsFormProps) => {
  const [formData, setFormData] = useState(settings);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Informations générales
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextField
            label="Nom de l'hôtel"
            value={formData.hotelName}
            onChange={(e) =>
              setFormData({ ...formData, hotelName: e.target.value })
            }
            required
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fuseau horaire
            </label>
            <select
              value={formData.timezone}
              onChange={(e) =>
                setFormData({ ...formData, timezone: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="America/New_York">America/New_York</option>
              <option value="Europe/Paris">Europe/Paris</option>
              <option value="Europe/London">Europe/London</option>
              <option value="Asia/Tokyo">Asia/Tokyo</option>
            </select>
          </div>
          <TextField
            label="Heure de check-in"
            type="time"
            value={formData.checkInTime}
            onChange={(e) =>
              setFormData({ ...formData, checkInTime: e.target.value })
            }
            required
          />
          <TextField
            label="Heure de check-out"
            type="time"
            value={formData.checkOutTime}
            onChange={(e) =>
              setFormData({ ...formData, checkOutTime: e.target.value })
            }
            required
          />
          <TextField
            label="Devise"
            value={formData.currency}
            onChange={(e) =>
              setFormData({ ...formData, currency: e.target.value })
            }
            required
          />
          <TextField
            label="Taux de taxe (%)"
            type="number"
            value={formData.taxRate.toString()}
            onChange={(e) =>
              setFormData({ ...formData, taxRate: parseFloat(e.target.value) })
            }
            required
          />
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Paramètres de notification
        </h2>
        <div className="space-y-3">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.notificationSettings.emailEnabled}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  notificationSettings: {
                    ...formData.notificationSettings,
                    emailEnabled: e.target.checked,
                  },
                })
              }
              className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">
              Activer les notifications par email
            </span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.notificationSettings.smsEnabled}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  notificationSettings: {
                    ...formData.notificationSettings,
                    smsEnabled: e.target.checked,
                  },
                })
              }
              className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">
              Activer les notifications par SMS
            </span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.notificationSettings.whatsappEnabled}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  notificationSettings: {
                    ...formData.notificationSettings,
                    whatsappEnabled: e.target.checked,
                  },
                })
              }
              className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">
              Activer les notifications par WhatsApp
            </span>
          </label>
          <TextField
            label="Jours avant arrivée pour notification"
            type="number"
            value={formData.notificationSettings.upcomingArrivalsDays.toString()}
            onChange={(e) =>
              setFormData({
                ...formData,
                notificationSettings: {
                  ...formData.notificationSettings,
                  upcomingArrivalsDays: parseInt(e.target.value),
                },
              })
            }
            min={1}
            max={30}
            required
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={isSaving}>
          {isSaving ? 'Enregistrement...' : 'Enregistrer les modifications'}
        </Button>
      </div>
    </form>
  );
};
