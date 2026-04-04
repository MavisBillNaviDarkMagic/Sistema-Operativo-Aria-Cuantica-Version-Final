
import { Device } from '@capacitor/device';
import { Network } from '@capacitor/network';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { StatusBar, Style } from '@capacitor/status-bar';
import { App } from '@capacitor/app';
import { SystemStatus } from '../types';

export const systemService = {
  async getStatus(): Promise<SystemStatus> {
    const batteryInfo = await Device.getBatteryInfo();
    const networkStatus = await Network.getStatus();
    const deviceInfo = await Device.getInfo();

    return {
      battery: {
        level: (batteryInfo.batteryLevel || 0) * 100,
        isCharging: batteryInfo.isCharging || false,
      },
      network: {
        connected: networkStatus.connected,
        connectionType: networkStatus.connectionType,
      },
      device: {
        model: deviceInfo.model,
        platform: deviceInfo.platform,
        osVersion: deviceInfo.osVersion,
      },
    };
  },

  async vibrate() {
    try {
      await Haptics.impact({ style: ImpactStyle.Heavy });
    } catch (e) {
      console.warn('Haptics not supported');
    }
  },

  async setStatusBarColor(color: string, style: Style = Style.Dark) {
    try {
      await StatusBar.setBackgroundColor({ color });
      await StatusBar.setStyle({ style });
    } catch (e) {
      console.warn('StatusBar not supported');
    }
  },

  async minimizeApp() {
    try {
      await App.minimizeApp();
    } catch (e) {
      console.warn('App minimize not supported');
    }
  },

  async isNative(): Promise<boolean> {
    const info = await Device.getInfo();
    return info.platform !== 'web';
  },

  onNetworkChange(callback: (status: any) => void) {
    return Network.addListener('networkStatusChange', callback);
  }
};
