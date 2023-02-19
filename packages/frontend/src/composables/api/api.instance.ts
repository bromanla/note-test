import { ElMessage } from 'element-plus';
import { ref } from 'vue';
import type { KyInstance } from 'ky/distribution/types/ky';

export class ApiInstance {
  constructor(protected api: KyInstance) {}

  /* Индикатор загрузки данных */
  private isLoading = ref(false);
  /* Флаг задержки перед переключением индикатора */
  private toggleLoading = false;
  protected path = '';
  protected pathId = (id: number) => `${this.path}/${id}`;

  get loading() {
    return this.isLoading.value;
  }

  protected toUrlSearchParam = (
    params: Record<string, string | number | string[] | number[] | undefined>,
  ) => {
    const searchParams = new URLSearchParams();

    for (const key in params) {
      const data = params[key];

      if (Array.isArray(data))
        for (const subdata of data)
          subdata && searchParams.append(`${key}[]`, String(subdata));
      else data && searchParams.append(key, String(data));
    }

    return searchParams;
  };

  protected async wrapper<T>(action: () => Promise<T>) {
    try {
      this.toggleLoading = false;
      this.isLoading.value = true;
      return await action();
    } catch (error) {
      this.errorInterceptor(error);
      return undefined as T;
    } finally {
      /**
       * Предотвращаем скачки loading при
       * последовательном вызове методов api
       */
      this.toggleLoading = true;
      setTimeout(() => {
        if (this.toggleLoading) this.isLoading.value = false;
      }, 50);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private async errorInterceptor(error: any) {
    if (error?.name === 'HTTPError') {
      const errorJson = await error.response.json();
      return ElMessage({
        type: 'error',
        message: errorJson?.message,
      });
    } else {
      console.error(error);
    }
  }
}
