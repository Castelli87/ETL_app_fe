import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import flushPromises from 'flush-promises'; // Import flushPromises
import IndexPage from '@/pages/index.vue';

describe('IndexPage', () => {
  let fetchMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    // Mock the global fetch API
    fetchMock = vi.fn();
    global.fetch = fetchMock;
  });

  it('displays the loading message initially', () => {
    // Mount the component
    const wrapper = mount(IndexPage);

    // Expect the loading message to be displayed
    expect(wrapper.text()).toContain('Loading...');
  });

  it('fetches and displays the API response', async () => {
    // Mock fetch to return a successful response
    fetchMock.mockResolvedValueOnce({
      json: vi.fn().mockResolvedValueOnce({ message: 'Hello, API!' }),
    } as unknown as Response);

    // Mount the component
    const wrapper = mount(IndexPage);

    // Wait for the onMounted and fetch logic to complete
    await flushPromises();

    // Expect the API response to be displayed
    expect(wrapper.text()).toContain('Hello, API!');
  });


  it('handles API fetch errors gracefully', async () => {
    // Mock fetch to throw an error
    fetchMock.mockRejectedValueOnce(new Error('API Error'));

    // Spy on the console.error to ensure it's called
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    // Mount the component
    const wrapper = mount(IndexPage);

    // Wait for the fetch and component update
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();

    // Ensure the console error was logged
    expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching the API:', expect.any(Error));

    // Expect the loading message to remain (since no message was set)
    expect(wrapper.text()).toContain('Loading...');

    // Restore the console.error mock
    consoleErrorSpy.mockRestore();
  });
});
