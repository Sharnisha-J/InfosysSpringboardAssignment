package com.neurofleetx.model;

public class MaintenanceInfo {
    private int engineHealth;
    private int tiresHealth;
    private int brakesHealth;
    private int batteryHealth;
    private double mileage;
    
    public MaintenanceInfo() {}
    
    public MaintenanceInfo(int engineHealth, int tiresHealth, int brakesHealth, 
                          int batteryHealth, double mileage) {
        this.engineHealth = engineHealth;
        this.tiresHealth = tiresHealth;
        this.brakesHealth = brakesHealth;
        this.batteryHealth = batteryHealth;
        this.mileage = mileage;
    }
    
    public int getEngineHealth() { return engineHealth; }
    public void setEngineHealth(int engineHealth) { this.engineHealth = engineHealth; }
    
    public int getTiresHealth() { return tiresHealth; }
    public void setTiresHealth(int tiresHealth) { this.tiresHealth = tiresHealth; }
    
    public int getBrakesHealth() { return brakesHealth; }
    public void setBrakesHealth(int brakesHealth) { this.brakesHealth = brakesHealth; }
    
    public int getBatteryHealth() { return batteryHealth; }
    public void setBatteryHealth(int batteryHealth) { this.batteryHealth = batteryHealth; }
    
    public double getMileage() { return mileage; }
    public void setMileage(double mileage) { this.mileage = mileage; }
}