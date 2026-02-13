import { useEffect, useState } from 'react';
import { Loader } from '@app/contracts/ui.contract';
import { SettingsForm } from './components/SettingsForm';
import { settingsService } from '../../services/settings.service';
import { HotelSettings } from '../../types/settings.types';

export const HotelSettingsPage = () => {
  const [settings, setSettings] = useState<HotelSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setIsLoading(true);
      const data = await settingsService.getSettings();
      setSettings(data);
    } catch (error) {
      console.error('Failed to load settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (updatedSettings: HotelSettings) => {
    try {
      setIsSaving(true);
      await settingsService.updateSettings(updatedSettings);
      setSettings(updatedSettings);
      alert('Paramètres enregistrés avec succès');
    } catch (error) {
      console.error('Failed to save settings:', error);
      alert('Erreur lors de l\'enregistrement des paramètres');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading || !settings) {
    return <Loader />;
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Paramètres de l'hôtel</h1>
        <p className="text-sm text-gray-600 mt-1">
          Configurer les paramètres généraux de l'hôtel
        </p>
      </div>

      <SettingsForm
        settings={settings}
        onSave={handleSave}
        isSaving={isSaving}
      />
    </div>
  );
};
