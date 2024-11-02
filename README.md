## STIG Manager Dashboard

This is a web-based STIG compliance dashboard. For real system scanning capabilities, this application needs to be:

1. Installed locally on the target system
2. Run with appropriate system permissions
3. Built as a desktop application (e.g., using Electron)

### Running Real Scans

To perform real system scans:

1. Clone this repository to your local Linux system
2. Install Node.js and npm
3. Build the application as a desktop app using Electron
4. Run with sudo privileges for system access

Example desktop app setup (not possible in browser):

```bash
# Install dependencies
npm install
npm install electron electron-builder --save-dev

# Add electron main process file
# Update package.json for electron
# Build desktop app
npm run build
```

### Current Limitations

The web version cannot perform real system scans due to browser security restrictions. To implement real scanning:

1. Move scanning logic to a backend service
2. Use proper system access permissions
3. Implement actual file system and command execution checks
4. Handle security implications of system access

### Security Note

Real STIG scanning requires system-level access to:
- Read configuration files
- Check system settings
- Verify security policies
- Access system logs

These operations cannot be performed in a web browser environment.