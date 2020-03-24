import { TestBed } from '@angular/core/testing';

import { ConfigPanelService } from './config-panel.service';

describe('ConfigPanelService', () => {
  let service: ConfigPanelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfigPanelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
